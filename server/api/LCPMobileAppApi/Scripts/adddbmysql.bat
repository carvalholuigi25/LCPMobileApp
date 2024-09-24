@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

call "%pthproj%\Scripts\dropdbmysql.bat"

SET DefDBMode=MySQL
echo %DefDBMode%
dotnet ef migrations add InitialCreateMySQL --context MDBContext --output-dir "%pthmig%\MySQL"

call "%pthproj%\Scripts\upddb.bat"

pause
exit /b 0
endlocal