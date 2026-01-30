@echo off
REM Start LM Studio Server with Qwen model
echo Starting LM Studio Server...
echo.

REM Try the common installation path
cd /d "C:\Program Files\LM Studio" 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo LM Studio not found in default location
    pause
    exit /b 1
)

REM Start server with the Qwen model on port 8000
start lm-studio.exe --port 8000

REM Wait a moment for server to start
timeout /t 3 /nobreak

REM Open browser to verify connection
start http://localhost:8000/v1/models

echo.
echo Server should now be running on http://localhost:8000
pause
