@echo off
echo ========================================
echo REINICIANDO BACKEND CON CORS CORRECTO
echo ========================================
echo.

echo 1. Deteniendo procesos de uvicorn...
taskkill /f /im uvicorn.exe 2>nul
timeout /t 2 /nobreak >nul

echo 2. Verificando archivos...
if not exist "main.py" (
    echo ERROR: No se encuentra main.py
    pause
    exit /b 1
)

if not exist "crud.py" (
    echo ERROR: No se encuentra crud.py
    pause
    exit /b 1
)

if not exist "database.py" (
    echo ERROR: No se encuentra database.py
    pause
    exit /b 1
)

echo 3. Iniciando backend con CORS habilitado...
echo.
echo Configuracion:
echo - Host: 0.0.0.0 (acepta conexiones externas)
echo - Puerto: 8000
echo - CORS: Habilitado para todos los origenes
echo.
echo Para detener: Ctrl+C
echo ========================================
echo.

uvicorn main:app --host 0.0.0.0 --port 8000 --reload 