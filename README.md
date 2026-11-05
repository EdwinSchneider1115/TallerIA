# IA Generativa - Plataforma Educativa

Sitio web educativo sobre los fundamentos de la IA Generativa con autenticación mediante Firebase.

---

## 🌐 ENLACE DIRECTO (GitHub Pages)

**Link de la web:**  
👉 **https://EdwinSchneider1115.github.io/TallerIA/landing.html**

### ¿Cómo entrar?

1. Copia y pega este enlace en tu navegador:  
   **https://EdwinSchneider1115.github.io/TallerIA/landing.html**

2. O haz clic directo si estás leyendo esto en GitHub.

> ⚠️ **Importante:** Si al entrar te dice "404" o la página no carga, significa que el dueño del repositorio aún no ha activado GitHub Pages.  
> Para activarlo: ve a **Settings → Pages** → selecciona rama `main` y carpeta `/(root)` → guarda.

---

## 💻 Cómo ejecutar localmente

Este sitio es totalmente estático. No necesitas instalar nada. Solo abre cualquiera de estos archivos directamente en tu navegador (Chrome, Edge, Firefox, etc.):

- **`index.html`** — Página de inicio
- **`landing.html`** — Página principal (contenido educativo)
- **`login.html`** — Iniciar sesión
- **`register.html`** — Crear cuenta

No necesitas servidor, ni Node.js, ni Python. Solo haz doble clic en el archivo `.html`.

---

## 📁 Estructura del proyecto

```
aplicacionWebEducativa/
├── index.html         # Página de inicio
├── landing.html       # Página principal (hero + contenido)
├── login.html         # Inicio de sesión
├── register.html      # Registro de usuarios
├── dashboard.html     # Panel de usuario (interno, requiere login)
├── styles.css         # Estilos principales
├── script.js          # Lógica de la aplicación
├── firebase-config.js # Configuración de Firebase
└── README.md          # Este archivo
```

---

## ✨ Características

- ✅ Diseño responsive y moderno
- ✅ Animaciones al scroll y partículas de fondo
- ✅ Autenticación con Firebase (Email/Password)
- ✅ Línea de tiempo interactiva con imágenes
- ✅ Visualizador de tokens
- ✅ Panel de usuario con logout

---

## 🔐 Configuración de Firebase (Obligatorio para login/registro)

Antes de que funcione el login/registro, debes configurar Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `talleria-2f756`
3. Ve a **Authentication → Sign-in method**
4. Activa **Email/Password** y guarda
5. Ve a **Authentication → Settings → Authorized domains**
6. Agrega `localhost` (para local) o tu dominio de GitHub Pages

---
