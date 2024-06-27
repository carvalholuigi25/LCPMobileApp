@echo off
setlocal enableextensions

taskkill /f /im emulator.exe
taskkill /f /im qemu-system-x86_64.exe

pause
exit /b 0
endlocal
