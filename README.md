# IA Generativa - Plataforma Educativa

Sitio web educativo sobre los fundamentos de la IA Generativa con autenticación mediante Firebase.

## Despliegue en Vercel

### Opción 1: Conectar repositorio de GitHub

1. Sube este código a un repositorio de GitHub
2. Ve a [Vercel](https://vercel.com) e importa el repositorio
3. Configura:
   - **Framework Preset**: Vite (o deja en "Other")
   - **Build Command**: `npm run build` (o dejar vacío)
   - **Output Directory**: `.` (directorio raíz)
4. Haz clic en Deploy

### Opción 2: Con Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel --prod
```

### Configuración de Firebase (Obligatorio)

Antes de que funcione el login/registro, debes configurar Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `talleria-2f756`
3. Ve a **Authentication → Sign-in method**
4. Activa **Email/Password** y guarda
5. Ve a **Authentication → Settings → Authorized domains**
6. Agrega tu dominio de Vercel (ej: `tu-proyecto.vercel.app`)

## Estructura del proyecto

```
aplicacionWebEducativa/
├── index.html              # Redirección a landing
├── landing.html            # Página principal (hero + contenido)
├── login.html              # Inicio de sesión
├── register.html           # Registro de usuarios
├── styles.css              # Estilos principales
├── vercel.json             # Configuración de Vercel
├── package.json            # Metadata del proyecto
└── README.md               # Este archivo
```

## Características

- ✅ Diseño responsive y moderno
- ✅ Animaciones al scroll y partículas de fondo
- ✅ Autenticación con Firebase (Email/Password)
- ✅ Línea de tiempo interactiva con imágenes
- ✅ Visualizador de tokens
- ✅ Panel de usuario con logout
- ✅ Despliegue listo para Vercel
