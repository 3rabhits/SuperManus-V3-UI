@echo off
title SuperManus V3 UI - Build for Production
color 0E
chcp 65001 >nul

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║       SuperManus V3 UI - Production Build Script       ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

:: Navigate to project directory
cd /d "%~dp0"

:: Check if node_modules exists
if not exist "frontend\node_modules" (
    echo  [INFO] Dependencies not installed. Running install first...
    call install.bat
)

echo  [INFO] Building for production...
echo.

cd frontend
call npm run build

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo  [ERROR] Build failed!
    pause
    exit /b 1
)

cd ..

echo.
echo  ╔════════════════════════════════════════════════════════╗
echo  ║              Build Completed Successfully!             ║
echo  ╠════════════════════════════════════════════════════════╣
echo  ║  Output folder: frontend\build                         ║
echo  ║                                                        ║
echo  ║  To preview the build locally:                         ║
echo  ║  cd frontend ^&^& npx serve -s build                     ║
echo  ║                                                        ║
echo  ║  To deploy:                                            ║
echo  ║  Upload the 'build' folder to your hosting provider    ║
echo  ╚════════════════════════════════════════════════════════╝
echo.

pause
