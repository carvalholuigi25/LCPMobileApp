@echo off
setlocal enableextensions

cls
REM cd ../
cd "%USERPROFILE%\Documents\projects\react\native\LCPMobileApp"

if exist "node_modules" (
    bash -c "rm -rf node_modules"
)

if exist "package-lock.json" (
    bash -c "rm -rf package-lock.json"
)

npm cache verify --force
npm cache clear --force
npm cache clean --force

pause
exit /b %errorlevel%
endlocal