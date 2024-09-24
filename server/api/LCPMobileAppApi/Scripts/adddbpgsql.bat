@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

call "%pthproj%\Scripts\dropdbpgsql.bat"

SET DefDBMode=PostgresSQL
echo %DefDBMode%

dotnet ef migrations add InitialCreatePostgresSQL --context MDBContextPostgresSQL --output-dir "%pthmig%\PostgresSQL"
dotnet ef database update --context MDBContextPostgresSQL

pause
exit /b 0
endlocal