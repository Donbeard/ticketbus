# Script para encontrar la ubicación del SDK de Android
Write-Host "🔍 Buscando Android SDK..." -ForegroundColor Yellow

$possiblePaths = @(
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk",
    "C:\Android\Sdk",
    "C:\Program Files\Android\Sdk",
    "C:\Program Files (x86)\Android\Sdk",
    "C:\Users\$env:USERNAME\.android\sdk"
)

$found = $false

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        Write-Host "✅ SDK encontrado en: $path" -ForegroundColor Green
        $found = $true
        
        # Actualizar local.properties
        $localProperties = "android\local.properties"
        $content = "sdk.dir=$($path.Replace('\', '\\'))"
        Set-Content -Path $localProperties -Value $content
        Write-Host "📝 Archivo local.properties actualizado" -ForegroundColor Green
        break
    }
}

if (-not $found) {
    Write-Host "❌ No se encontró Android SDK en las ubicaciones comunes" -ForegroundColor Red
    Write-Host "`n📋 Para instalar Android Studio:" -ForegroundColor Yellow
    Write-Host "1. Ve a: https://developer.android.com/studio" -ForegroundColor White
    Write-Host "2. Descarga e instala Android Studio" -ForegroundColor White
    Write-Host "3. Durante la instalación, asegúrate de instalar Android SDK" -ForegroundColor White
    Write-Host "4. Ejecuta este script nuevamente" -ForegroundColor White
    
    Write-Host "`n🔧 O configura manualmente:" -ForegroundColor Yellow
    Write-Host "1. Abre Android Studio" -ForegroundColor White
    Write-Host "2. Ve a File > Settings > Appearance & Behavior > System Settings > Android SDK" -ForegroundColor White
    Write-Host "3. Copia la ruta del 'Android SDK Location'" -ForegroundColor White
    Write-Host "4. Edita android\local.properties y agrega: sdk.dir=TU_RUTA" -ForegroundColor White
}

Read-Host "`nPresiona Enter para continuar..." 