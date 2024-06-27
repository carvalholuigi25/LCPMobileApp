@echo off
setlocal enableextensions

%ANDROID_HOME%\emulator\emulator.exe -avd "Pixel_3a_API_34" -no-snapshot-load

pause
exit /b 0
endlocal
