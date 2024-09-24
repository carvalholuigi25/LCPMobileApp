@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"

cd %pthproj%

SET DefDBMode=SQLServer
echo %DefDBMode%

if exist "%pthmig%\%DefDBMode%" (
    rmdir /s /q "%pthmig%\%DefDBMode%"
)

dotnet ef migrations remove --force --context MDBContextSQLServer
dotnet ef database drop --force --context MDBContextSQLServer

pause
exit /b 0
endlocal