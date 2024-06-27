@echo off
setlocal enableextensions

%ANDROID_HOME%\emulator\emulator.exe -avd "Pixel_3a_API_34"

pause
exit /b 0
endlocal
