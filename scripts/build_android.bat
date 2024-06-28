@echo off
setlocal enableextensions

cd "../"
npx expo prebuild && npx react-native run-android --mode="release"
cd android && ./gradlew assembleRelease && cd "../"

REM npx react-native build-android --interative

pause
exit /b 0
endlocal