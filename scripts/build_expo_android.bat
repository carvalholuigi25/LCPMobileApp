@echo off
setlocal enableextensions

cd "../"
eas build -p android --profile preview

pause
exit /b 0
endlocal