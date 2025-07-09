@echo off
echo ========================================
echo GENERANDO APK PARA PRODUCTOS APP
echo ========================================

echo.
echo 1. Construyendo la aplicación web...
call npm run build

echo.
echo 2. Sincronizando con Capacitor...
call npx cap sync

echo.
echo 3. Generando APK con Gradle...
cd android
call gradlew assembleDebug

echo.
echo ========================================
echo APK GENERADO EXITOSAMENTE
echo ========================================
echo.
echo El APK se encuentra en:
echo android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo Para instalar en tu dispositivo Android:
echo 1. Conecta tu dispositivo via USB
echo 2. Habilita "Opciones de desarrollador" y "Depuracion USB"
echo 3. Ejecuta: adb install android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause 