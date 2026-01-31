"""
SuperManus V3 - Backend with OpenAI API
"""

import asyncio
import json
import uuid
import os
from datetime import datetime
from typing import Dict, List, Optional, Any
from pathlib import Path

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
from openai import OpenAI

# ============================================================================
# Configuration
# ============================================================================

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# Initialize OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# ============================================================================
# FastAPI App
# ============================================================================

app = FastAPI(title="SuperManus V3 API", version="3.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# Data Models
# ============================================================================

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    steps: List[Dict]
    files: List[Dict]

# ============================================================================
# Connection Manager for WebSocket
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

manager = ConnectionManager()

# ============================================================================
# Session Storage
# ============================================================================

sessions: Dict[str, List[Dict]] = {}

def get_session_history(session_id: str) -> List[Dict]:
    if session_id not in sessions:
        sessions[session_id] = []
    return sessions[session_id]

# ============================================================================
# OpenAI Chat Function
# ============================================================================

async def chat_with_openai(message: str, session_id: str, ws_session_id: Optional[str] = None) -> Dict:
    """Chat with OpenAI and return structured response"""
    
    history = get_session_history(session_id)
    
    # Build messages for OpenAI
    messages = [
        {
            "role": "system",
            "content": """You are SuperManus, an advanced AI assistant similar to Manus.im. You can help with:
- Research and information gathering
- Writing and creating content
- Coding and debugging
- Automation and workflows
- Analysis and problem-solving

When responding:
1. Be helpful, accurate, and thorough
2. Use markdown formatting for better readability
3. Include code blocks with syntax highlighting when showing code
4. Structure your responses with headers and lists when appropriate
5. If asked to create files, describe what you would create

Always provide comprehensive and useful responses."""
        }
    ]
    
    # Add conversation history
    for msg in history[-10:]:  # Last 10 messages for context
        messages.append({
            "role": msg["role"],
            "content": msg["content"]
        })
    
    # Add current message
    messages.append({
        "role": "user",
        "content": message
    })
    
    # Send thinking status via WebSocket
    if ws_session_id:
        await manager.send(ws_session_id, "status", {"status": "thinking"})
        await manager.send(ws_session_id, "step", {
            "id": "1",
            "type": "thinking",
            "title": "Analyzing task",
            "description": "Understanding your request...",
            "status": "running"
        })
    
    try:
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=messages,
            max_tokens=4000,
            temperature=0.7
        )
        
        assistant_message = response.choices[0].message.content
        
        # Save to history
        history.append({"role": "user", "content": message})
        history.append({"role": "assistant", "content": assistant_message})
        
        # Send completion status via WebSocket
        if ws_session_id:
            await manager.send(ws_session_id, "step_update", {"id": "1", "status": "completed"})
            await manager.send(ws_session_id, "status", {"status": "completed"})
        
        # Create steps for the response
        steps = [
            {
                "id": "1",
                "type": "thinking",
                "title": "Analyzing task",
                "description": "Understanding your request",
                "status": "completed"
            },
            {
                "id": "2",
                "type": "executing",
                "title": "Generating response",
                "description": "Creating comprehensive answer",
                "status": "completed"
            }
        ]
        
        return {
            "response": assistant_message,
            "session_id": session_id,
            "steps": steps,
            "files": []
        }
        
    except Exception as e:
        error_msg = f"Error communicating with OpenAI: {str(e)}"
        print(f"[ERROR] {error_msg}")
        
        if ws_session_id:
            await manager.send(ws_session_id, "status", {"status": "failed", "error": error_msg})
        
        return {
            "response": f"❌ {error_msg}",
            "session_id": session_id,
            "steps": [],
            "files": []
        }

# ============================================================================
# REST API Endpoints
# ============================================================================

@app.get("/")
async def root():
    return {"message": "SuperManus V3 API", "version": "3.0.0", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy", "openai": "configured"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat endpoint for REST API"""
    session_id = request.session_id or str(uuid.uuid4())
    result = await chat_with_openai(request.message, session_id)
    return result

@app.get("/api/sessions/{session_id}")
async def get_session(session_id: str):
    """Get session history"""
    history = get_session_history(session_id)
    return {"session_id": session_id, "messages": history}

@app.delete("/api/sessions/{session_id}")
async def clear_session(session_id: str):
    """Clear session history"""
    if session_id in sessions:
        del sessions[session_id]
    return {"message": "Session cleared"}

# ============================================================================
# WebSocket Endpoint
# ============================================================================

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, session_id)
    
    try:
        # Send connection confirmation
        await manager.send(session_id, "connected", {"session_id": session_id})
        
        while True:
            # Receive message
            data = await websocket.receive_json()
            
            if data.get("type") == "chat":
                message = data.get("message", "")
                if message:
                    # Process with OpenAI
                    result = await chat_with_openai(message, session_id, session_id)
                    
                    # Send response
                    await manager.send(session_id, "response", {
                        "content": result["response"],
                        "steps": result["steps"],
                        "files": result["files"]
                    })
            
            elif data.get("type") == "ping":
                await manager.send(session_id, "pong", {})
                
    except WebSocketDisconnect:
        manager.disconnect(session_id)
    except Exception as e:
        print(f"[WS] Error: {e}")
        manager.disconnect(session_id)

# ============================================================================
# Run Server
# ============================================================================

if __name__ == "__main__":
    print("=" * 50)
    print("SuperManus V3 Backend with OpenAI API")
    print("=" * 50)
    print(f"OpenAI API Key: {'Configured' if OPENAI_API_KEY else 'Not configured'}")
    print("=" * 50)
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
