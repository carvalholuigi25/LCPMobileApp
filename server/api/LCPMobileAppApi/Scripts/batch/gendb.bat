@echo off
setlocal enableextensions
SET "pthproj=%userprofile%\Documents\projects\LCPMobileApp\server\api\LCPMobileAppApi"
SET "pthmig=%pthproj%\Migrations"
SET DefDBMode=SQLite

cd %pthproj%

call :main

:chkDNEFInstalled
dotnet ef >nul 2>&1
if %errorlevel% neq 0 (
    dotnet tool install --global dotnet-ef
) else (
    echo Dotnet EF Core Tools installed
)
goto :end

:addDB
call :chkDNEFInstalled

if exist "%pthmig%" (
    rmdir /s /q "%pthmig%"
)

if not exist "%pthproj%\Database\%~1" (
    mkdir "%pthproj%\Database\%~1"
)

dotnet ef migrations remove --force --context "MDBContext%~1"
dotnet ef database drop --force --context "MDBContext%~1"
dotnet ef migrations add "InitialCreate%~1" --context "MDBContext%~1" --output-dir "%pthmig%/%~1"
dotnet ef database update "InitialCreate%~1" --context "MDBContext%~1"
goto :end

:addSQLite
cls
SET DefDBMode=SQLite
echo %DefDBMode%
call :addDB %DefDBMode%
goto :end

:addSQLServer
cls
SET DefDBMode=SQLServer
echo %DefDBMode%
call :addDB %DefDBMode%
goto :end

:addPostgresSQL
cls
SET DefDBMode=PostgresSQL
echo %DefDBMode%
call :addDB %DefDBMode%
goto :end

:addMySQL
cls
SET DefDBMode=MySQL
echo %DefDBMode%
call :addDB %DefDBMode%
goto :end

:addAll
call :addSQLite
call :addSQLServer
call :addPostgresSQL
call :addMySQL
goto :end

:main
cls
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

if "%chdbmode%" EQU "" ( goto :addSQLite )
if "%chdbmode%" EQU "1" ( goto :addSQLite )
if "%chdbmode%" EQU "2" ( goto :addSQLServer )
if "%chdbmode%" EQU "3" ( goto :addPostgresSQL )
if "%chdbmode%" EQU "4" ( goto :addMySQL )
if "%chdbmode%" EQU "5" ( goto :addAll )
goto :invChoice

:invChoice
cls
echo Invalid choice!
goto :end

:end
pause
exit

endlocal
