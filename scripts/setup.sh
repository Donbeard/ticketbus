#!/bin/bash

echo "🚀 Configurando la aplicación de productos..."

# Crear archivo .env para el backend
echo "📝 Configurando variables de entorno..."
cat > backend/.env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/productos_db
SECRET_KEY=tu_clave_secreta_super_segura_aqui_2024
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
EOF

echo "✅ Variables de entorno configuradas"

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
pip install -r requirements.txt
cd ..

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

echo "✅ Dependencias instaladas"

# Configurar base de datos
echo "🗄️ Configurando base de datos..."
echo "Por favor, asegúrate de que PostgreSQL esté ejecutándose"
echo "Ejecuta el script database/init.sql en tu base de datos PostgreSQL"

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura PostgreSQL y ejecuta database/init.sql"
echo "2. Ajusta la URL de la base de datos en backend/.env"
echo "3. Ejecuta el backend: cd backend && python run.py"
echo "4. Ejecuta el frontend: cd frontend && npm start"
echo ""
echo "🌐 URLs:"
echo "- Backend API: http://localhost:8000"
echo "- Frontend: http://localhost:3000"
echo "- API Docs: http://localhost:8000/docs" 