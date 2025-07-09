# 📱 Generar APK para Productos App

## 🚀 Opciones Disponibles

### **Opción 1: Capacitor (Recomendado)**
Convierte tu aplicación web actual en una APK nativa.

### **Opción 2: React Native**
Crea una aplicación nativa desde cero (más complejo pero mejor rendimiento).

### **Opción 3: PWA (Progressive Web App)**
Convierte tu app en una PWA que se puede instalar como app nativa.

---

## 📋 Requisitos Previos

### **Para Capacitor:**
1. ✅ Node.js y npm (ya instalados)
2. ✅ Android Studio (necesario para generar APK)
3. ✅ Android SDK
4. ✅ Java JDK 8 o superior

### **Para React Native:**
1. ✅ Node.js y npm
2. ✅ Android Studio
3. ✅ Android SDK
4. ✅ Java JDK 8 o superior

---

## 🛠️ Instalación de Android Studio

### **Paso 1: Descargar Android Studio**
1. Ve a: https://developer.android.com/studio
2. Descarga la versión para Windows
3. Instala siguiendo el asistente

### **Paso 2: Configurar Android SDK**
1. Abre Android Studio
2. Ve a `File > Settings > Appearance & Behavior > System Settings > Android SDK`
3. Instala:
   - Android SDK Platform 33 (o superior)
   - Android SDK Build-Tools
   - Android SDK Command-line Tools

### **Paso 3: Configurar Variables de Entorno**
Agrega estas variables a tu PATH:
```
ANDROID_HOME=C:\Users\[TuUsuario]\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-[version]
```

---

## 🔧 Generar APK con Capacitor

### **Paso 1: Ejecutar el Script Automático**
```bash
# Desde el directorio frontend
.\generate-apk.ps1
```

### **Paso 2: Generar Manualmente**
```bash
# 1. Construir la aplicación
npm run build

# 2. Sincronizar con Capacitor
npx cap sync

# 3. Abrir en Android Studio
npx cap open android

# 4. En Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s)
```

### **Paso 3: Generar APK desde Línea de Comandos**
```bash
# Desde el directorio frontend/android
cd android
.\gradlew.bat assembleDebug
```

---

## 📱 Instalar APK en Dispositivo

### **Paso 1: Preparar Dispositivo Android**
1. Ve a `Configuración > Acerca del teléfono`
2. Toca 7 veces en "Número de compilación"
3. Ve a `Configuración > Opciones de desarrollador`
4. Activa "Depuración USB"

### **Paso 2: Conectar Dispositivo**
1. Conecta tu dispositivo via USB
2. Selecciona "Transferir archivos" en el dispositivo
3. Verifica conexión: `adb devices`

### **Paso 3: Instalar APK**
```bash
# Instalar APK
adb install android\app\build\outputs\apk\debug\app-debug.apk

# O copiar APK al dispositivo
adb push android\app\build\outputs\apk\debug\app-debug.apk /sdcard/
```

---

## 🔄 Actualizar APK

### **Después de Cambios en el Código:**
```bash
# 1. Construir cambios
npm run build

# 2. Sincronizar
npx cap sync

# 3. Generar nuevo APK
cd android
.\gradlew.bat assembleDebug
```

---

## 🐛 Solución de Problemas

### **Error: "Android Studio no encontrado"**
- Instala Android Studio desde: https://developer.android.com/studio
- Configura la variable `CAPACITOR_ANDROID_STUDIO_PATH`

### **Error: "Gradle no encontrado"**
- Verifica que Android SDK esté instalado
- Ejecuta: `npx cap sync` para regenerar archivos

### **Error: "Java no encontrado"**
- Instala Java JDK 8 o superior
- Configura `JAVA_HOME` en variables de entorno

### **Error: "APK no se genera"**
- Verifica que Android SDK Platform 33+ esté instalado
- Ejecuta: `.\gradlew.bat clean` y luego `.\gradlew.bat assembleDebug`

---

## 📊 Ubicación de Archivos

### **APK Generado:**
```
frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### **Configuración Capacitor:**
```
frontend/capacitor.config.ts
```

### **Código Android:**
```
frontend/android/
```

---

## 🎯 Próximos Pasos

1. **Personalizar Icono:** Cambia `android/app/src/main/res/mipmap-*`
2. **Cambiar Nombre:** Edita `android/app/src/main/res/values/strings.xml`
3. **Configurar Permisos:** Edita `android/app/src/main/AndroidManifest.xml`
4. **Firmar APK:** Para distribución, firma el APK con tu keystore

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que todos los requisitos estén instalados
2. Ejecuta `npx cap doctor` para diagnosticar problemas
3. Revisa los logs de error en la consola 