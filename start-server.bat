@echo off
echo Starting News Intelligence Server...
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause

