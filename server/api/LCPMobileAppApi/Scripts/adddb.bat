@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

call "%pthproj%\Scripts\dropdb.bat"

SET DefDBMode=SQLite
echo %DefDBMode%
dotnet ef migrations add InitialCreateSQLite --context MDBContextSQLite --output-dir "%pthmig%\SQLite"

SET DefDBMode=SQLServer
echo %DefDBMode%
dotnet ef migrations add InitialCreateSQLServer --context MDBContextSQLServer --output-dir "%pthmig%\SQLServer"

SET DefDBMode=PostgresSQL
echo %DefDBMode%
dotnet ef migrations add InitialCreatePostgresSQL --context MDBContextPostgresSQL --output-dir "%pthmig%\PostgresSQL"

@REM SET DefDBMode=MySQL
@REM echo %DefDBMode%
@REM dotnet ef migrations add InitialCreateMySQL --context MDBContextMySQL --output-dir "%pthmig%\MySQL"

pause
exit /b 0
endlocal