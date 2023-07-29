@echo off
setlocal enableextensions

cd "C:\android\platform-tools"
adb shell su root ls -la /data/data/host.exp.exponent/files/SQLite
adb shell su root cp -r /data/data/host.exp.exponent/files/SQLite/ /sdcard/Documents
adb pull /sdcard/Documents/SQLite/lcpmobileapp.db %USERPROFILE%\Documents\projects\react\native\lcpmobileapp.db
adb pull /sdcard/Documents/SQLite/lcpmobileapp.db-journal %USERPROFILE%\Documents\projects\react\native\lcpmobileapp.db-journal

pause
exit /b %errorlevel%
endlocal