@echo off
setlocal enableextensions

cd "../"
npx expo prebuild && npx react-native run-ios --mode="release"

REM npx react-native build-ios --interative

pause
exit /b 0
endlocal