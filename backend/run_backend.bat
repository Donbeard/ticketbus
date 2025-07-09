@echo off
echo ========================================
echo INICIANDO BACKEND PARA APLICACION MOVIL
echo ========================================
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