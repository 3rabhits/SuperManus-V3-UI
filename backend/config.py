"""
SuperManus V3 - Configuration
Environment-based configuration for cross-platform compatibility
"""

import os
from pathlib import Path
from typing import List

# ============================================================================
# Environment Detection
# ============================================================================

def get_project_root() -> Path:
    """Get the project root directory"""
    return Path(__file__).parent.parent

def get_openmanus_path() -> Path:
    """
    Get OpenManus path from environment or auto-detect
    Priority:
    1. OPENMANUS_PATH environment variable
    2. ../OpenManus_V3 (sibling directory)
    3. ~/OpenManus_V3 (home directory)
    """
    # Check environment variable first
    env_path = os.getenv("OPENMANUS_PATH")
    if env_path and Path(env_path).exists():
        return Path(env_path)
    
    # Check sibling directory
    sibling_path = get_project_root().parent / "OpenManus_V3"
    if sibling_path.exists():
        return sibling_path
    
    # Check home directory
    home_path = Path.home() / "OpenManus_V3"
    if home_path.exists():
        return home_path
    
    # Fallback to environment variable even if not exists (for error messages)
    return Path(env_path) if env_path else home_path

def get_workspace_path() -> Path:
    """
    Get workspace path from environment or auto-detect
    Priority:
    1. WORKSPACE_PATH environment variable
    2. OpenManus workspace directory
    3. ./workspace (local directory)
    """
    # Check environment variable first
    env_path = os.getenv("WORKSPACE_PATH")
    if env_path:
        path = Path(env_path)
        path.mkdir(parents=True, exist_ok=True)
        return path
    
    # Check OpenManus workspace
    openmanus_workspace = get_openmanus_path() / "workspace"
    if openmanus_workspace.exists():
        return openmanus_workspace
    
    # Fallback to local workspace
    local_workspace = get_project_root() / "workspace"
    local_workspace.mkdir(parents=True, exist_ok=True)
    return local_workspace

# ============================================================================
# Security Configuration
# ============================================================================

def get_allowed_origins() -> List[str]:
    """
    Get allowed CORS origins from environment
    Default: localhost only for security
    """
    env_origins = os.getenv("ALLOWED_ORIGINS", "")
    if env_origins:
        return [origin.strip() for origin in env_origins.split(",")]
    
    # Default: localhost only
    return [
        "http://localhost:3000",
        "http://localhost:3003",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3003",
    ]

def get_api_key() -> str:
    """
    Get API key for authentication (optional)
    If not set, authentication is disabled
    """
    return os.getenv("API_KEY", "")

def is_production() -> bool:
    """Check if running in production mode"""
    return os.getenv("ENV", "development").lower() == "production"

# ============================================================================
# Server Configuration
# ============================================================================

class Config:
    """Main configuration class"""
    
    # Paths
    PROJECT_ROOT = get_project_root()
    OPENMANUS_PATH = get_openmanus_path()
    WORKSPACE_PATH = get_workspace_path()
    
    # Security
    ALLOWED_ORIGINS = get_allowed_origins()
    API_KEY = get_api_key()
    IS_PRODUCTION = is_production()
    
    # Server
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    
    # Limits
    MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "50000"))  # 50KB
    MAX_FILES_SCAN = int(os.getenv("MAX_FILES_SCAN", "1000"))
    
    @classmethod
    def validate(cls) -> dict:
        """Validate configuration and return status"""
        issues = []
        
        if not cls.OPENMANUS_PATH.exists():
            issues.append(f"OpenManus not found at: {cls.OPENMANUS_PATH}")
        
        if not cls.WORKSPACE_PATH.exists():
            issues.append(f"Workspace not found at: {cls.WORKSPACE_PATH}")
        
        if cls.IS_PRODUCTION and not cls.API_KEY:
            issues.append("API_KEY is required in production mode")
        
        return {
            "valid": len(issues) == 0,
            "issues": issues,
            "config": {
                "openmanus_path": str(cls.OPENMANUS_PATH),
                "workspace_path": str(cls.WORKSPACE_PATH),
                "allowed_origins": cls.ALLOWED_ORIGINS,
                "is_production": cls.IS_PRODUCTION,
                "has_api_key": bool(cls.API_KEY),
            }
        }
    
    @classmethod
    def print_config(cls):
        """Print configuration for debugging"""
        print("=" * 60)
        print("SuperManus V3 - Configuration")
        print("=" * 60)
        print(f"Project Root:    {cls.PROJECT_ROOT}")
        print(f"OpenManus Path:  {cls.OPENMANUS_PATH}")
        print(f"Workspace Path:  {cls.WORKSPACE_PATH}")
        print(f"Allowed Origins: {cls.ALLOWED_ORIGINS}")
        print(f"Production Mode: {cls.IS_PRODUCTION}")
        print(f"API Key Set:     {bool(cls.API_KEY)}")
        print(f"Server:          {cls.HOST}:{cls.PORT}")
        print("=" * 60)


# Export for easy access
config = Config()
