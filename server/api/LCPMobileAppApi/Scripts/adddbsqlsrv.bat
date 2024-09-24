@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

call "%pthproj%\Scripts\dropdbsqlsrv.bat"

SET DefDBMode=SQLServer
echo %DefDBMode%
dotnet ef migrations add InitialCreateSQLServer --context MDBContext --output-dir "%pthmig%\SQLServer"

call "%pthproj%\Scripts\upddb.bat"

pause
exit /b 0
endlocal