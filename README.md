# Base App - Gestión de Productos y Ventas

Aplicación web completa para gestión de productos y ventas con funcionalidad offline.

## 🚀 Características

- **Backend**: FastAPI con PostgreSQL
- **Frontend**: React con TypeScript
- **Funcionalidad Offline**: Almacenamiento local y sincronización
- **APK**: Generación de aplicación móvil con Capacitor
- **Responsive**: Diseño adaptativo para móviles y escritorio

## 📱 Funcionalidades

- ✅ Gestión de productos (CRUD)
- ✅ Gestión de ventas
- ✅ Dashboard con estadísticas
- ✅ Modo offline
- ✅ Sincronización automática
- ✅ APK para Android
- ✅ Menú responsive

## 🛠️ Tecnologías

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Uvicorn

### Frontend
- React
- TypeScript
- Tailwind CSS
- Capacitor

## 📦 Instalación

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Generar APK
```bash
cd frontend
npm run build
npx cap sync
cd android
.\gradlew assembleDebug
```

## 🔧 Configuración

1. Crear base de datos PostgreSQL
2. Configurar variables de entorno en `.env`
3. Ejecutar migraciones (si aplica)

## 📄 Licencia

MIT 