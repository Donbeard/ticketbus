@echo off
echo 🚀 Configurando la aplicación de productos...

REM Crear archivo .env para el backend
echo 📝 Configurando variables de entorno...
(
echo DATABASE_URL=postgresql://postgres:password@localhost:5432/productos_db
echo SECRET_KEY=tu_clave_secreta_super_segura_aqui_2024
echo ALGORITHM=HS256
echo ACCESS_TOKEN_EXPIRE_MINUTES=30
) > backend\.env

echo ✅ Variables de entorno configuradas

REM Instalar dependencias del backend
echo 📦 Instalando dependencias del backend...
cd backend
pip install -r requirements.txt
cd ..

REM Instalar dependencias del frontend
echo 📦 Instalando dependencias del frontend...
cd frontend
npm install
cd ..

echo ✅ Dependencias instaladas

REM Configurar base de datos
echo 🗄️ Configurando base de datos...
echo Por favor, asegúrate de que PostgreSQL esté ejecutándose
echo Ejecuta el script database/init.sql en tu base de datos PostgreSQL

echo.
echo 🎉 Configuración completada!
echo.
echo 📋 Próximos pasos:
echo 1. Configura PostgreSQL y ejecuta database/init.sql
echo 2. Ajusta la URL de la base de datos en backend/.env
echo 3. Ejecuta el backend: cd backend ^&^& python run.py
echo 4. Ejecuta el frontend: cd frontend ^&^& npm start
echo.
echo 🌐 URLs:
echo - Backend API: http://localhost:8000
echo - Frontend: http://localhost:3000
echo - API Docs: http://localhost:8000/docs

pause 