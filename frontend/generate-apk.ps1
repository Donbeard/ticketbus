# Script para generar APK de Productos App
Write-Host "========================================" -ForegroundColor Green
Write-Host "GENERANDO APK PARA PRODUCTOS APP" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Verificar si estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "Error: Debes ejecutar este script desde el directorio frontend" -ForegroundColor Red
    exit 1
}

# Paso 1: Construir la aplicación web
Write-Host "`n1. Construyendo la aplicación web..." -ForegroundColor Yellow
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Error al construir la aplicación"
    }
    Write-Host "✓ Aplicación construida exitosamente" -ForegroundColor Green
} catch {
    Write-Host "✗ Error al construir la aplicación: $_" -ForegroundColor Red
    exit 1
}

# Paso 2: Sincronizar con Capacitor
Write-Host "`n2. Sincronizando con Capacitor..." -ForegroundColor Yellow
try {
    npx cap sync
    if ($LASTEXITCODE -ne 0) {
        throw "Error al sincronizar con Capacitor"
    }
    Write-Host "✓ Sincronización completada" -ForegroundColor Green
} catch {
    Write-Host "✗ Error al sincronizar: $_" -ForegroundColor Red
    exit 1
}

# Paso 3: Verificar si existe el directorio android
if (-not (Test-Path "android")) {
    Write-Host "✗ Error: No se encontró el directorio android. Ejecuta 'npx cap add android' primero" -ForegroundColor Red
    exit 1
}

# Paso 4: Generar APK con Gradle
Write-Host "`n3. Generando APK con Gradle..." -ForegroundColor Yellow
try {
    Set-Location android
    if (Test-Path "gradlew.bat") {
        .\gradlew.bat assembleDebug
    } else {
        Write-Host "✗ Error: No se encontró gradlew.bat. Verifica que Android SDK esté instalado" -ForegroundColor Red
        exit 1
    }
    
    if ($LASTEXITCODE -ne 0) {
        throw "Error al generar el APK"
    }
    
    Set-Location ..
    Write-Host "✓ APK generado exitosamente" -ForegroundColor Green
} catch {
    Write-Host "✗ Error al generar APK: $_" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Verificar si el APK se generó
$apkPath = "android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "APK GENERADO EXITOSAMENTE" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`n📱 APK: $apkPath" -ForegroundColor Cyan
    Write-Host "📏 Tamaño: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Cyan
    
    Write-Host "`n📋 Para instalar en tu dispositivo Android:" -ForegroundColor Yellow
    Write-Host "1. Conecta tu dispositivo via USB" -ForegroundColor White
    Write-Host "2. Habilita 'Opciones de desarrollador' y 'Depuracion USB'" -ForegroundColor White
    Write-Host "3. Ejecuta: adb install $apkPath" -ForegroundColor White
    
    Write-Host "`n🎉 ¡Tu APK está listo!" -ForegroundColor Green
} else {
    Write-Host "✗ Error: No se encontró el APK generado" -ForegroundColor Red
    exit 1
}

Read-Host "`nPresiona Enter para continuar..." 