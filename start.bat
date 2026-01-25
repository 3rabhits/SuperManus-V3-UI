@echo off
title SuperManus V3 UI
color 0A
chcp 65001 >nul

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║           SuperManus V3 UI - Startup Script            ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Node.js is not installed!
    echo.
    echo  Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo  [✓] Node.js found: 
call node --version
echo.

:: Check if Python is installed (for backend)
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo  [✓] Python found:
    call python --version
    echo.
    set PYTHON_AVAILABLE=1
) else (
    echo  [!] Python not found - Backend will not start
    echo.
    set PYTHON_AVAILABLE=0
)

:: Navigate to project directory
cd /d "%~dp0"

:: Install frontend dependencies if needed
if not exist "frontend\node_modules" (
    echo  [INFO] Installing frontend dependencies...
    echo  This may take a few minutes...
    echo.
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo  [ERROR] Failed to install frontend dependencies!
        pause
        exit /b 1
    )
    cd ..
    echo.
    echo  [✓] Frontend dependencies installed!
    echo.
)

:: Install backend dependencies if Python is available
if "%PYTHON_AVAILABLE%"=="1" (
    if not exist "backend\__pycache__" (
        echo  [INFO] Installing backend dependencies...
        cd backend
        call pip install -r requirements.txt -q
        cd ..
        echo  [✓] Backend dependencies installed!
        echo.
    )
)

:: Kill existing processes on ports 3000 and 8000
echo  [INFO] Checking for existing processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>nul
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>nul
)
echo.

:: Start Backend (if Python available)
if "%PYTHON_AVAILABLE%"=="1" (
    echo  [INFO] Starting Backend server...
    cd backend
    start "SuperManus Backend" /min cmd /c "python -m uvicorn main:app --host 0.0.0.0 --port 8000"
    cd ..
    timeout /t 3 /nobreak >nul
    echo  [✓] Backend started on http://localhost:8000
    echo.
)

:: Start Frontend
echo  [INFO] Starting Frontend server...
cd frontend
start "SuperManus Frontend" cmd /c "npm start"
cd ..

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║              SuperManus V3 UI is Running!              ║
echo  ╠════════════════════════════════════════════════════════╣
echo  ║  Frontend:  http://localhost:3000                      ║
if "%PYTHON_AVAILABLE%"=="1" (
echo  ║  Backend:   http://localhost:8000                      ║
)
echo  ╠════════════════════════════════════════════════════════╣
echo  ║  Press any key to stop all servers...                  ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

pause >nul

:: Cleanup - Kill processes
echo.
echo  [INFO] Stopping servers...
taskkill /FI "WINDOWTITLE eq SuperManus*" /F >nul 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>nul
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>nul
)
echo  [✓] All servers stopped.
echo.
