@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

dotnet ef migrations remove

if exist "%pthmig%" (
    rmdir /s /q "%pthmig%"
)

SET DefDBMode=SQLite
echo %DefDBMode%
dotnet ef database drop

SET DefDBMode=SQLServer
echo %DefDBMode%
dotnet ef database drop

SET DefDBMode=PostgresSQL
echo %DefDBMode%
dotnet ef database drop

@REM SET DefDBMode=MySQL
@REM echo %DefDBMode%
@REM dotnet ef database drop

pause
exit /b 0
endlocal