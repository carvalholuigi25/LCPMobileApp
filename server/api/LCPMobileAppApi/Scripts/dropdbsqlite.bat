@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"

cd %pthproj%

SET DefDBMode=SQLite
echo %DefDBMode%

if exist "%pthmig%\%DefDBMode%" (
    rmdir /s /q "%pthmig%\%DefDBMode%"
)

dotnet ef migrations remove --force --context MDBContextSQLite
dotnet ef database drop --force --context MDBContextSQLite

pause
exit /b 0
endlocal