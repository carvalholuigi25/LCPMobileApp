@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

SET DefDBMode=SQLite
echo %DefDBMode%

if exist "%pthmig%\%DefDBMode%" (
    rmdir /s /q "%pthmig%\%DefDBMode%"
)

dotnet ef migrations remove
dotnet ef database drop

pause
exit /b 0
endlocal