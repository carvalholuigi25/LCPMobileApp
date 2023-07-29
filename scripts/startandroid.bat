@echo off
setlocal enableextensions

cd "%ANDROID_HOME%"

"%ANDROID_HOME%\platform-tools\adb.exe" kill-server
"%ANDROID_HOME%\platform-tools\adb.exe" start-server

"%ANDROID_HOME%\emulator\emulator.exe" -avd "MyAndroid12"

pause
exit /b %errorlevel%
endlocal