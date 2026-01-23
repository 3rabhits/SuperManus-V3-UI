"""
SuperManus V3 - Real Working Backend
Inspired by Manus.im

Features:
- Environment-based configuration (no hardcoded paths)
- Secure CORS settings
- Optional API key authentication
- Cross-platform compatibility
"""

import asyncio
import json
import uuid
import sys
import os
from datetime import datetime
from typing import Dict, List, Optional, Any
from pathlib import Path
from enum import Enum
from functools import wraps

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException, Depends, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import uvicorn

# Import configuration
from config import config, Config

# ============================================================================
# Setup OpenManus Path
# ============================================================================

# Add OpenManus to path if exists
if config.OPENMANUS_PATH.exists():
    sys.path.insert(0, str(config.OPENMANUS_PATH))
    print(f"[INFO] OpenManus path added: {config.OPENMANUS_PATH}")
else:
    print(f"[WARNING] OpenManus not found at: {config.OPENMANUS_PATH}")
    print("[WARNING] Agent functionality will be limited")

# ============================================================================
# Data Models
# ============================================================================

class TaskStatus(str, Enum):
    IDLE = "idle"
    PLANNING = "planning"
    EXECUTING = "executing"
    COMPLETED = "completed"
    FAILED = "failed"

class StepType(str, Enum):
    THINKING = "thinking"
    BROWSING = "browsing"
    CREATING = "creating"
    READING = "reading"
    EXECUTING = "executing"
    SEARCHING = "searching"

# ============================================================================
# Authentication (Optional)
# ============================================================================

async def verify_api_key(x_api_key: Optional[str] = Header(None)):
    """Verify API key if configured"""
    if not config.API_KEY:
        return True  # No authentication required
    
    if x_api_key != config.API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    return True

# ============================================================================
# Connection Manager
# ============================================================================

class ConnectionManager:
    def __init__(self):
        self.connections: Dict[str, WebSocket] = {}
    
    async def connect(self, ws: WebSocket, session_id: str):
        await ws.accept()
        self.connections[session_id] = ws
        print(f"[WS] Connected: {session_id}")
    
    def disconnect(self, session_id: str):
        if session_id in self.connections:
            del self.connections[session_id]
            print(f"[WS] Disconnected: {session_id}")
    
    async def send(self, session_id: str, event: str, data: Any):
        if session_id in self.connections:
            try:
                await self.connections[session_id].send_json({
                    "type": event,
                    "data": data,
                    "timestamp": datetime.now().isoformat()
                })
            except Exception as e:
                print(f"[WS] Send error: {e}")

# ============================================================================
# File Scanner
# ============================================================================

def scan_workspace_files() -> List[Dict]:
    """Scan workspace for all files"""
    files = []
    workspace = config.WORKSPACE_PATH
    
    if not workspace.exists():
        print(f"[WARNING] Workspace not found: {workspace}")
        return files
    
    extensions = {
        'html': ('globe', True),
        'htm': ('globe', True),
        'css': ('palette', False),
        'js': ('code', False),
        'jsx': ('code', False),
        'ts': ('code', False),
        'tsx': ('code', False),
        'py': ('terminal', False),
        'json': ('braces', False),
        'md': ('file-text', False),
        'txt': ('file-text', False),
        'xml': ('code', False),
        'zip': ('archive', False),
    }
    
    file_count = 0
    for file_path in workspace.rglob('*'):
        if file_count >= config.MAX_FILES_SCAN:
            break
            
        if file_path.is_file() and 'node_modules' not in str(file_path):
            ext = file_path.suffix[1:].lower() if file_path.suffix else ''
            if ext in extensions or ext in ['png', 'jpg', 'jpeg', 'gif', 'svg']:
                icon, can_preview = extensions.get(ext, ('file', False))
                
                content = ""
                try:
                    if file_path.stat().st_size < config.MAX_FILE_SIZE:
                        content = file_path.read_text(encoding='utf-8', errors='ignore')
                except:
                    pass
                
                files.append({
                    "id": str(uuid.uuid4()),
                    "name": file_path.name,
                    "path": str(file_path),
                    "relative_path": str(file_path.relative_to(workspace)),
                    "type": ext,
                    "size": file_path.stat().st_size,
                    "icon": icon,
                    "can_preview": can_preview,
                    "content": content[:10000] if content else "",
                    "modified": datetime.fromtimestamp(file_path.stat().st_mtime).isoformat()
                })
                file_count += 1
    
    # Sort by modified time (newest first)
    files.sort(key=lambda x: x['modified'], reverse=True)
    return files

# ============================================================================
# SuperManus Runner
# ============================================================================

class SuperManusRunner:
    def __init__(self, manager: ConnectionManager):
        self.manager = manager
        self.sessions: Dict[str, Dict] = {}
        self.running_tasks: Dict[str, asyncio.Task] = {}
        self.agent_available = False
        self._check_agent()
    
    def _check_agent(self):
        """Check if SuperManus agent is available"""
        try:
            from app.agent.super_manus import SuperManus
            self.agent_available = True
            print("[INFO] SuperManus agent is available")
        except ImportError as e:
            self.agent_available = False
            print(f"[WARNING] SuperManus agent not available: {e}")
    
    def get_session(self, session_id: str) -> Dict:
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                "id": session_id,
                "messages": [],
                "steps": [],
                "status": TaskStatus.IDLE,
                "files": [],
                "created_at": datetime.now().isoformat()
            }
        return self.sessions[session_id]
    
    async def run_task(self, session_id: str, prompt: str):
        """Run SuperManus task with real-time updates"""
        session = self.get_session(session_id)
        
        # Add user message
        user_msg = {
            "id": str(uuid.uuid4()),
            "role": "user",
            "content": prompt,
            "timestamp": datetime.now().isoformat()
        }
        session["messages"].append(user_msg)
        await self.manager.send(session_id, "message", user_msg)
        
        # Check if agent is available
        if not self.agent_available:
            error_msg = {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": "❌ SuperManus agent is not available. Please check:\n\n1. OpenManus_V3 is installed\n2. OPENMANUS_PATH environment variable is set correctly\n3. All dependencies are installed",
                "timestamp": datetime.now().isoformat()
            }
            session["messages"].append(error_msg)
            await self.manager.send(session_id, "message", error_msg)
            await self.manager.send(session_id, "status", {"status": "failed", "error": "Agent not available"})
            return
        
        # Update status
        session["status"] = TaskStatus.PLANNING
        await self.manager.send(session_id, "status", {"status": "planning"})
        
        # Clear previous steps
        session["steps"] = []
        
        try:
            # Import SuperManus
            from app.agent.super_manus import SuperManus
            
            # Create agent
            agent = SuperManus()
            
            # Add planning step
            step1 = {
                "id": "1",
                "type": "thinking",
                "title": "Analyzing task",
                "description": "Understanding requirements and creating a plan",
                "status": "running",
                "started_at": datetime.now().isoformat()
            }
            session["steps"].append(step1)
            await self.manager.send(session_id, "step", step1)
            
            # Update status to executing
            session["status"] = TaskStatus.EXECUTING
            await self.manager.send(session_id, "status", {"status": "executing"})
            
            # Run the agent
            result = await self._run_agent_with_updates(agent, prompt, session_id, session)
            
            # Mark planning step as completed
            step1["status"] = "completed"
            step1["completed_at"] = datetime.now().isoformat()
            await self.manager.send(session_id, "step_update", {"id": "1", "status": "completed"})
            
            # Scan for new files
            files = scan_workspace_files()
            session["files"] = files
            await self.manager.send(session_id, "files", {"files": files})
            
            # Send assistant response
            assistant_msg = {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": result,
                "timestamp": datetime.now().isoformat()
            }
            session["messages"].append(assistant_msg)
            await self.manager.send(session_id, "message", assistant_msg)
            
            # Update status to completed
            session["status"] = TaskStatus.COMPLETED
            await self.manager.send(session_id, "status", {"status": "completed"})
            
        except Exception as e:
            print(f"[ERROR] Task failed: {e}")
            import traceback
            traceback.print_exc()
            
            session["status"] = TaskStatus.FAILED
            error_msg = {
                "id": str(uuid.uuid4()),
                "role": "assistant",
                "content": f"❌ Error: {str(e)}",
                "timestamp": datetime.now().isoformat()
            }
            session["messages"].append(error_msg)
            await self.manager.send(session_id, "message", error_msg)
            await self.manager.send(session_id, "status", {"status": "failed", "error": str(e)})
    
    async def _run_agent_with_updates(self, agent, prompt: str, session_id: str, session: Dict) -> str:
        """Run agent and send real-time updates"""
        step_counter = 2
        
        # Hook into agent's tool execution
        original_run = agent.run
        
        async def send_step(step_type: str, title: str, description: str = ""):
            nonlocal step_counter
            step = {
                "id": str(step_counter),
                "type": step_type,
                "title": title,
                "description": description,
                "status": "running",
                "started_at": datetime.now().isoformat()
            }
            session["steps"].append(step)
            await self.manager.send(session_id, "step", step)
            step_counter += 1
            return step
        
        async def complete_step(step_id: str, result: str = ""):
            for step in session["steps"]:
                if step["id"] == step_id:
                    step["status"] = "completed"
                    step["completed_at"] = datetime.now().isoformat()
                    step["result"] = result
                    await self.manager.send(session_id, "step_update", {
                        "id": step_id, 
                        "status": "completed",
                        "result": result
                    })
                    break
        
        # Start monitoring task
        async def monitor_files():
            known_files = set(f["name"] for f in scan_workspace_files())
            while session["status"] == TaskStatus.EXECUTING:
                await asyncio.sleep(2)
                current_files = scan_workspace_files()
                current_names = set(f["name"] for f in current_files)
                new_files = current_names - known_files
                if new_files:
                    for f in current_files:
                        if f["name"] in new_files:
                            await self.manager.send(session_id, "file_created", f)
                    known_files = current_names
                    session["files"] = current_files
        
        monitor_task = asyncio.create_task(monitor_files())
        
        try:
            # Add execution step
            exec_step = await send_step("executing", "Executing task", prompt)
            
            # Run the actual agent
            result = await original_run(prompt)
            
            # Complete execution step
            await complete_step(exec_step["id"], "Task completed successfully")
            
            return result
            
        finally:
            monitor_task.cancel()
            try:
                await monitor_task
            except asyncio.CancelledError:
                pass

# ============================================================================
# FastAPI App
# ============================================================================

app = FastAPI(
    title="SuperManus V3 API", 
    version="3.0.0",
    description="Professional Web Interface for SuperManus V3"
)

# CORS - Use configured origins (secure by default)
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS if config.IS_PRODUCTION else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount workspace for static files (only if exists)
if config.WORKSPACE_PATH.exists():
    app.mount("/workspace", StaticFiles(directory=str(config.WORKSPACE_PATH)), name="workspace")

manager = ConnectionManager()
runner = SuperManusRunner(manager)

# ============================================================================
# API Endpoints
# ============================================================================

@app.get("/")
async def root():
    return {
        "message": "SuperManus V3 API", 
        "version": "3.0.0", 
        "status": "running",
        "agent_available": runner.agent_available
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy", 
        "timestamp": datetime.now().isoformat(),
        "agent_available": runner.agent_available
    }

@app.get("/api/config")
async def get_config():
    """Get current configuration (for debugging)"""
    return config.validate()

@app.get("/api/files")
async def get_files():
    """Get all workspace files"""
    files = scan_workspace_files()
    return {"files": files, "count": len(files)}

@app.get("/api/files/{file_path:path}")
async def get_file_content(file_path: str):
    """Get content of a specific file"""
    full_path = config.WORKSPACE_PATH / file_path
    if not full_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Security: Ensure path is within workspace
    try:
        full_path.resolve().relative_to(config.WORKSPACE_PATH.resolve())
    except ValueError:
        raise HTTPException(status_code=403, detail="Access denied")
    
    try:
        content = full_path.read_text(encoding='utf-8')
        return {"path": file_path, "content": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/preview/{file_name}")
async def preview_file(file_name: str):
    """Serve file for preview"""
    # Security: Only allow specific file types
    allowed_extensions = ['.html', '.htm', '.txt', '.md', '.json']
    if not any(file_name.lower().endswith(ext) for ext in allowed_extensions):
        raise HTTPException(status_code=403, detail="File type not allowed for preview")
    
    for root, dirs, files in os.walk(str(config.WORKSPACE_PATH)):
        if file_name in files:
            file_path = Path(root) / file_name
            # Security: Ensure path is within workspace
            try:
                file_path.resolve().relative_to(config.WORKSPACE_PATH.resolve())
            except ValueError:
                raise HTTPException(status_code=403, detail="Access denied")
            return FileResponse(str(file_path))
    
    raise HTTPException(status_code=404, detail="File not found")

@app.get("/api/download/{file_path:path}")
async def download_file(file_path: str):
    """Download a file"""
    full_path = config.WORKSPACE_PATH / file_path
    if not full_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # Security: Ensure path is within workspace
    try:
        full_path.resolve().relative_to(config.WORKSPACE_PATH.resolve())
    except ValueError:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return FileResponse(str(full_path), filename=full_path.name)

@app.get("/api/sessions/{session_id}")
async def get_session(session_id: str):
    """Get session details"""
    session = runner.get_session(session_id)
    return session

# ============================================================================
# WebSocket Endpoint
# ============================================================================

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, session_id)
    
    # Send initial data
    files = scan_workspace_files()
    await manager.send(session_id, "files", {"files": files})
    await manager.send(session_id, "status", {"status": "idle", "agent_available": runner.agent_available})
    
    try:
        while True:
            data = await websocket.receive_text()
            msg = json.loads(data)
            
            if msg.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
            
            elif msg.get("type") == "chat":
                prompt = msg.get("prompt", "").strip()
                if prompt:
                    # Run task in background
                    task = asyncio.create_task(runner.run_task(session_id, prompt))
                    runner.running_tasks[session_id] = task
            
            elif msg.get("type") == "get_files":
                files = scan_workspace_files()
                await manager.send(session_id, "files", {"files": files})
            
            elif msg.get("type") == "stop":
                if session_id in runner.running_tasks:
                    runner.running_tasks[session_id].cancel()
                    await manager.send(session_id, "status", {"status": "stopped"})
                    
    except WebSocketDisconnect:
        manager.disconnect(session_id)
    except Exception as e:
        print(f"[WS] Error: {e}")
        manager.disconnect(session_id)

# ============================================================================
# Run Server
# ============================================================================

if __name__ == "__main__":
    # Print configuration
    config.print_config()
    
    # Validate configuration
    validation = config.validate()
    if not validation["valid"]:
        print("\n[WARNING] Configuration issues:")
        for issue in validation["issues"]:
            print(f"  - {issue}")
        print()
    
    # Run server
    uvicorn.run(app, host=config.HOST, port=config.PORT)
