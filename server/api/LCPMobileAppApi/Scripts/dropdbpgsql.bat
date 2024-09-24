@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"

cd %pthproj%

SET DefDBMode=PostgresSQL
echo %DefDBMode%

if exist "%pthmig%\%DefDBMode%" (
    rmdir /s /q "%pthmig%\%DefDBMode%"
)

dotnet ef migrations remove --force --context MDBContextPostgresSQL
dotnet ef database drop --force --context MDBContextPostgresSQL

pause
exit /b 0
endlocal