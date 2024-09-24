@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

call "%pthproj%\Scripts\dropdbsqlite.bat"

SET DefDBMode=SQLite
echo %DefDBMode%

dotnet ef migrations add InitialCreateSQLite --context MDBContextSQLite --output-dir "%pthmig%\SQLite"
dotnet ef database update --context MDBContextSQLite

pause
exit /b 0
endlocal