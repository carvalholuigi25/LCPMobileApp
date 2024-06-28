@echo off
setlocal enableextensions

cd "../"
eas build -p ios --profile preview

pause
exit /b 0
endlocal