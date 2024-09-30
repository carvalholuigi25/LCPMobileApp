@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

call :main

:rmmigdir
if exist "%pthmig%\%DefDBMode%" (
    rmdir /s /q "%pthmig%\%DefDBMode%"
)
goto :eof
EXIT /B %ERRORLEVEL%

:addsqlite
cls
SET DefDBMode=SQLite
echo %DefDBMode%
call :rmmigdir
dotnet ef migrations remove --force --context "MDBContext%DefDBMode%"
dotnet ef database drop --force --context "MDBContext%DefDBMode%"
dotnet ef migrations add "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%" --output-dir "%pthmig%\%DefDBMode%"
dotnet ef database update "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%"
goto :eof
EXIT /B %ERRORLEVEL%

:addsqlserver
cls
SET DefDBMode=SQLServer
echo %DefDBMode%
call :rmmigdir
dotnet ef migrations remove --force --context "MDBContext%DefDBMode%"
dotnet ef database drop --force --context "MDBContext%DefDBMode%"
dotnet ef migrations add "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%" --output-dir "%pthmig%\%DefDBMode%"
dotnet ef database update "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%"
goto :eof
EXIT /B %ERRORLEVEL%

:addpostgressql
cls
SET DefDBMode=PostgresSQL
echo %DefDBMode%
call :rmmigdir
dotnet ef migrations remove --force --context "MDBContext%DefDBMode%"
dotnet ef database drop --force --context "MDBContext%DefDBMode%"
dotnet ef migrations add "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%" --output-dir "%pthmig%\%DefDBMode%"
dotnet ef database update "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%"
goto :eof
EXIT /B %ERRORLEVEL%

:addmysql
cls
SET DefDBMode=MySQL
echo %DefDBMode%
call :rmmigdir
dotnet ef migrations remove --force --context "MDBContext%DefDBMode%"
dotnet ef database drop --force --context "MDBContext%DefDBMode%"
dotnet ef migrations add "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%" --output-dir "%pthmig%\%DefDBMode%"
dotnet ef database update "InitialCreate%DefDBMode%" --context "MDBContext%DefDBMode%"
goto :eof
EXIT /B %ERRORLEVEL%

:addall
call :addsqlite
call :addsqlserver
call :addpostgressql
call :addmysql
goto :eof
EXIT /B %ERRORLEVEL%

:main
cls
cd %pthproj%
echo.
echo Generate DB for API
echo.
echo --------------------------------------
echo Author Info:
echo Name: Luis Carvalho
echo Email: luiscarvalho239@gmail.com
echo Date creation of script: 30/09/2024
echo --------------------------------------
echo.
echo Choose your option:
echo.
echo Note: The default option is %DefDBMode%
echo.
echo 1 - SQLite
echo 2 - SQLServer
echo 3 - PostgresSQL
echo 4 - MySQL
echo 5 - All
echo.
set /p chdbmode=""

if "%chdbmode%" EQU "" goto :addsqlite
if "%chdbmode%" EQU "1" goto :addsqlite
if "%chdbmode%" EQU "2" goto :addsqlserver
if "%chdbmode%" EQU "3" goto :addpostgressql
if "%chdbmode%" EQU "4" goto :addmysql
if "%chdbmode%" EQU "5" goto :addall
goto :endchoice

:endchoice
cls
echo Invalid choice!
pause
exit /b %ERRORLEVEL%

endlocal