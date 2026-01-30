@echo off
REM Start LM Studio Server with Qwen model
echo Starting LM Studio Server...
echo.

REM Check common installation paths and use the first match
set "PATH1=C:\Program Files\LM Studio"
set "PATH2=C:\Users\chenp\AppData\Local\Programs\LM Studio"
set "EXE=LM studio.exe"

if exist "%PATH1%\%EXE%" (
    cd /d "%PATH1%"
) else if exist "%PATH2%\%EXE%" (
    cd /d "%PATH2%"
) else (
    echo LM Studio executable not found in expected locations.
    echo Checked:
    echo  - %PATH1%\%EXE%
    echo  - %PATH2%\%EXE%
    echo Please update this script with the correct install path.
    pause
    exit /b 1
)

REM Start server with the Qwen model on port 8000
start "" "%CD%\%EXE%" --model "qwen/qwen3-vl-8b" --port 8000

REM Wait a moment for server to start
timeout /t 3 /nobreak

REM Open browser to verify connection
start http://localhost:8000/v1/models

echo.
echo Server should now be running on http://localhost:8000
pause
