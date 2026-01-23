@echo off
REM SuperManus V3 - Start Script for Windows

ECHO Starting SuperManus V3...

REM Kill existing processes
FOR /F "tokens=5" %%G IN (
    'netstat -a -n -o ^| findstr :8000'
) DO taskkill /F /PID %%G

FOR /F "tokens=5" %%G IN (
    'netstat -a -n -o ^| findstr :3003'
) DO taskkill /F /PID %%G

REM Start Backend
ECHO Starting Backend...
cd backend
start "Backend" /B uvicorn main:app --host 0.0.0.0 --port 8000
cd ..

REM Wait for backend
timeout /t 5 /nobreak > nul

REM Start Frontend
ECHO Starting Frontend...
cd frontend
start "Frontend" /B npm start -- --port 3003
cd ..

ECHO.
ECHO SuperManus V3 is running!
ECHO - Frontend: http://localhost:3003
ECHO - Backend:  http://localhost:8000
ECHO.
ECHO To stop, close the terminal windows.
