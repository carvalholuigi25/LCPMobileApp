@echo off
setlocal enableextensions

SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"

cd %pthproj%

dotnet ef database update

pause
exit /b 0
endlocal