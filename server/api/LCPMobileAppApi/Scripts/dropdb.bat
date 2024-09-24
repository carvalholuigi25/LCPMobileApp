@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

dotnet ef migrations remove --force

if exist "%pthmig%" (
    rmdir /s /q "%pthmig%"
)

SET DefDBMode=SQLite
echo %DefDBMode%
dotnet ef database drop --force --context MDBContextSQLite

SET DefDBMode=SQLServer
echo %DefDBMode%
dotnet ef database drop --force --context MDBContextSQLServer

SET DefDBMode=PostgresSQL
echo %DefDBMode%
dotnet ef database drop --force --context MDBContextPostgresSQL

@REM SET DefDBMode=MySQL
@REM echo %DefDBMode%
@REM dotnet ef database drop --force --context MDBContextMySQL

pause
exit /b 0
endlocal