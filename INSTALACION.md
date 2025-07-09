# Guía de Instalación - App de Productos

## 📋 Requisitos Previos

### Software Necesario:
- **Python 3.8+** - [Descargar Python](https://python.org)
- **Node.js 16+** - [Descargar Node.js](https://nodejs.org)
- **PostgreSQL 12+** - [Descargar PostgreSQL](https://postgresql.org)
- **Git** - [Descargar Git](https://git-scm.com)

### Herramientas Opcionales:
- **Postman** - Para probar la API
- **pgAdmin** - Para gestionar PostgreSQL

## 🚀 Instalación Rápida

### Opción 1: Script Automático (Recomendado)

**Windows:**
```cmd
scripts\setup.bat
```

**Linux/Mac:**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Opción 2: Instalación Manual

#### 1. Configurar Base de Datos

1. **Iniciar PostgreSQL:**
   ```bash
   # Windows (si instalaste con instalador)
   # PostgreSQL se inicia automáticamente
   
   # Linux
   sudo systemctl start postgresql
   
   # Mac
   brew services start postgresql
   ```

2. **Crear base de datos:**
   ```bash
   psql -U postgres
   ```
   
   En psql:
   ```sql
   CREATE DATABASE productos_db;
   \q
   ```

3. **Ejecutar script de inicialización:**
   ```bash
   psql -U postgres -d productos_db -f database/init.sql
   ```

#### 2. Configurar Backend

1. **Crear entorno virtual:**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

2. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configurar variables de entorno:**
   ```bash
   # Copiar archivo de ejemplo
   cp env.example .env
   
   # Editar .env con tus credenciales de PostgreSQL
   ```

4. **Ejecutar servidor:**
   ```bash
   python run.py
   ```

#### 3. Configurar Frontend

1. **Instalar dependencias:**
   ```bash
   cd frontend
   npm install
   ```

2. **Ejecutar aplicación:**
   ```bash
   npm start
   ```

## 🔧 Configuración Detallada

### Variables de Entorno (backend/.env)

```env
DATABASE_URL=postgresql://usuario:password@localhost:5432/productos_db
SECRET_KEY=tu_clave_secreta_aqui
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Configuración de PostgreSQL

1. **Crear usuario (opcional):**
   ```sql
   CREATE USER productos_user WITH PASSWORD 'tu_password';
   GRANT ALL PRIVILEGES ON DATABASE productos_db TO productos_user;
   ```

2. **Configurar conexión:**
   - Host: localhost
   - Puerto: 5432
   - Base de datos: productos_db
   - Usuario: postgres (o el que creaste)
   - Contraseña: la que configuraste

### Puertos Utilizados

- **Backend API:** http://localhost:8000
- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs

## 🧪 Verificar Instalación

### 1. Probar Backend

1. **Acceder a la documentación:**
   - Abrir http://localhost:8000/docs
   - Deberías ver la interfaz de Swagger

2. **Probar endpoint de estadísticas:**
   ```bash
   curl http://localhost:8000/stats/
   ```

### 2. Probar Frontend

1. **Abrir aplicación:**
   - Ir a http://localhost:3000
   - Deberías ver el dashboard

2. **Verificar funcionalidades:**
   - Navegar a "Productos"
   - Crear un producto de prueba
   - Verificar que aparece en la lista

### 3. Probar Base de Datos

1. **Conectar con psql:**
   ```bash
   psql -U postgres -d productos_db
   ```

2. **Verificar tablas:**
   ```sql
   \dt
   SELECT * FROM productos;
   ```

## 🐛 Solución de Problemas

### Error: "Connection refused" en PostgreSQL
```bash
# Verificar que PostgreSQL esté ejecutándose
# Windows
services.msc  # Buscar "PostgreSQL"

# Linux
sudo systemctl status postgresql

# Mac
brew services list | grep postgresql
```

### Error: "Module not found" en Python
```bash
# Activar entorno virtual
cd backend
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Reinstalar dependencias
pip install -r requirements.txt
```

### Error: "Cannot find module" en Node.js
```bash
# Limpiar cache de npm
npm cache clean --force

# Reinstalar dependencias
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error: CORS en el navegador
- Verificar que el backend esté ejecutándose en puerto 8000
- Verificar configuración CORS en `backend/main.py`

## 📱 Próximos Pasos

### Para Desarrollo:
1. **Explorar la API:** http://localhost:8000/docs
2. **Modificar componentes:** `frontend/src/components/`
3. **Agregar nuevas rutas:** `backend/main.py`
4. **Modificar base de datos:** `database/init.sql`

### Para Producción:
1. **Configurar servidor web:** Nginx/Apache
2. **Configurar SSL:** Certificados HTTPS
3. **Configurar base de datos:** Optimizar PostgreSQL
4. **Configurar backups:** Scripts automáticos

### Para Android:
1. **Leer documentación:** `docs/MIGRACION_ANDROID.md`
2. **Elegir estrategia:** React Native o Capacitor
3. **Configurar entorno:** Android Studio
4. **Migrar componentes:** Adaptar a móvil

## 📞 Soporte

Si tienes problemas:

1. **Verificar logs:**
   - Backend: Consola donde ejecutaste `python run.py`
   - Frontend: Consola del navegador (F12)

2. **Verificar conectividad:**
   - Backend: http://localhost:8000/
   - Frontend: http://localhost:3000

3. **Verificar base de datos:**
   ```bash
   psql -U postgres -d productos_db -c "SELECT version();"
   ```

¡La aplicación debería estar funcionando correctamente! 🎉 

## 🎯 **Aplicación Completa Creada**

### **Backend (FastAPI + PostgreSQL)**
- ✅ API REST completa con FastAPI
- ✅ Base de datos PostgreSQL con tablas para productos y ventas
- ✅ Operaciones CRUD completas
- ✅ Validación de datos con Pydantic
- ✅ Documentación automática (Swagger)
- ✅ CORS configurado para frontend

### **Frontend (React + TypeScript + Tailwind)**
- ✅ Interfaz moderna y responsive
- ✅ Gestión completa de productos (crear, editar, eliminar)
- ✅ Sistema de ventas integrado
- ✅ Dashboard con estadísticas
- ✅ Navegación entre páginas
- ✅ Diseño optimizado para móvil

### **Base de Datos**
- ✅ Script de inicialización completo
- ✅ Datos de ejemplo incluidos
- ✅ Índices para optimización
- ✅ Triggers automáticos

### **Migración a Android**
- ✅ Documentación completa en `docs/MIGRACION_ANDROID.md`
- ✅ Opciones: React Native, Capacitor, PWA
- ✅ Estructura preparada para migración

##  **Para Empezar**

1. **Ejecutar script de configuración:**
   ```bash
   # Windows
   scripts\setup.bat
   
   # Linux/Mac
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

2. **Configurar PostgreSQL:**
   - Ejecutar `database/init.sql`
   - Ajustar credenciales en `backend/.env`

3. **Iniciar servidores:**
   ```bash
   # Backend
   cd backend
   python run.py
   
   # Frontend (nueva terminal)
   cd frontend
   npm start
   ```

## 📱 **Para Migrar a Android**

La aplicación está diseñada para facilitar la migración a Android. Te recomiendo:

1. **React Native** (mejor opción para APK nativo)
2. **Capacitor** (más rápido, reutiliza código web)
3. **PWA** (más simple, funciona offline)

Toda la documentación está en `docs/MIGRACION_ANDROID.md` con pasos detallados.

## 🌟 **Características Destacadas**

- **Interfaz responsive** que se adapta a móviles
- **API bien documentada** con Swagger
- **Base de datos optimizada** con PostgreSQL
- **Código TypeScript** para mejor mantenimiento
- **Estructura modular** fácil de extender
- **Scripts de configuración** automáticos

¿Te gustaría que te ayude con algún paso específico de la instalación o con la migración a Android? 