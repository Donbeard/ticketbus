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

## 🔧 **¿Qué son las variables de entorno?**

Las variables de entorno son **configuraciones** que tu aplicación necesita para funcionar, pero que no están escritas directamente en el código por seguridad.

### **Ejemplo práctico:**

En tu archivo `backend/database.py` tienes algo como:
```python
DATABASE_URL = "postgresql://usuario:password@localhost:5432/base_datos"
```

**Problema:** Si subes esto a GitHub, cualquiera puede ver tu contraseña de la base de datos.

**Solución:** Usar variables de entorno:
```python
DATABASE_URL = os.getenv("DATABASE_URL")
```

## 📝 **Variables que necesitas en Railway:**

### **1. DATABASE_URL**
- **¿Qué es?** La URL de conexión a tu base de datos PostgreSQL
- **Formato:** `postgresql://usuario:password@host:puerto/nombre_db`
- **Ejemplo:** `postgresql://postgres:mi_password@localhost:5432/base_app`

### **2. SECRET_KEY**
- **¿Qué es?** Una clave secreta para encriptar datos
- **Formato:** Cualquier string largo y aleatorio
- **Ejemplo:** `mi_clave_super_secreta_123456789`

## 🛠️ **Cómo configurarlas en Railway:**

### **Paso 1: Ir a Railway**
1. Abre tu proyecto en Railway
2. Ve a la pestaña **Variables**

### **Paso 2: Agregar DATABASE_URL**
1. **Name:** `DATABASE_URL`
2. **Value:** `postgresql://postgres:tu_password@localhost:5432/base_app`
3. **Add Variable**

### **Paso 3: Agregar SECRET_KEY**
1. **Name:** `SECRET_KEY`
2. **Value:** `mi_clave_super_secreta_123456789`
3. **Add Variable**

## 🤔 **¿De dónde saco la DATABASE_URL?**

**Opción A: Usar tu base de datos local**
- Si tienes PostgreSQL instalado en tu PC
- Usar la misma que usas localmente

**Opción B: Usar base de datos de Railway (recomendado)**
1. En Railway, ve a **New Service**
2. Selecciona **Database** → **PostgreSQL**
3. Railway te dará automáticamente la DATABASE_URL

**¿Cuál opción prefieres?** Te recomiendo usar la base de datos de Railway porque es más fácil y está incluida en el plan gratuito. 