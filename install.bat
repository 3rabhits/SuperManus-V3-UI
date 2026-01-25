@echo off
title SuperManus V3 UI - Installation
color 0B
chcp 65001 >nul

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║         SuperManus V3 UI - Installation Script         ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Node.js is not installed!
    echo.
    echo  Please download and install Node.js from:
    echo  https://nodejs.org/
    echo.
    echo  Make sure to check "Add to PATH" during installation.
    echo.
    pause
    exit /b 1
)

echo  [✓] Node.js version:
call node --version
echo.
echo  [✓] npm version:
call npm --version
echo.

:: Navigate to project directory
cd /d "%~dp0"

:: Install frontend dependencies
echo  ════════════════════════════════════════════════════════
echo  Installing Frontend Dependencies...
echo  ════════════════════════════════════════════════════════
echo.

cd frontend

:: Clean install
if exist "node_modules" (
    echo  [INFO] Removing old node_modules...
    rmdir /s /q node_modules 2>nul
)

if exist "package-lock.json" (
    del package-lock.json 2>nul
)

echo  [INFO] Running npm install...
echo  This may take 2-5 minutes depending on your internet speed.
echo.

call npm install

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo  [ERROR] Failed to install frontend dependencies!
    echo.
    echo  Try the following:
    echo  1. Check your internet connection
    echo  2. Run as Administrator
    echo  3. Try: npm cache clean --force
    echo.
    pause
    exit /b 1
)

cd ..

echo.
echo  [✓] Frontend dependencies installed successfully!
echo.

:: Check for Python and install backend dependencies
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo  ════════════════════════════════════════════════════════
    echo  Installing Backend Dependencies...
    echo  ════════════════════════════════════════════════════════
    echo.
    
    cd backend
    call pip install -r requirements.txt
    cd ..
    
    if %errorlevel% equ 0 (
        echo.
        echo  [✓] Backend dependencies installed successfully!
    ) else (
        echo.
        echo  [!] Backend dependencies installation had issues.
        echo      The frontend will still work.
    )
) else (
    echo  [!] Python not found - Skipping backend installation.
    echo      You can still use the frontend without the backend.
)

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║           Installation Complete!                       ║
echo  ╠════════════════════════════════════════════════════════╣
echo  ║  To start the application:                             ║
echo  ║  - Double-click on start.bat                           ║
echo  ║  - Or run: cd frontend ^&^& npm start                    ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

pause
