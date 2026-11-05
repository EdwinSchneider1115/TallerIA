# IA Generativa - Plataforma Educativa

Sitio web educativo sobre los fundamentos de la IA Generativa con autenticación mediante Firebase.

## 🌐 Ver en vivo (GitHub Pages)

Si el dueño del repositorio ha activado GitHub Pages, puedes abrir la plataforma directamente desde aquí:

> [🚀 Abrir IA Generativa en vivo](https://EdwinSchneider1115.github.io/TallerIA/landing.html)

> ⚠️ Si el enlace no funciona, es porque GitHub Pages aún no está activado. Ve a **Settings → Pages** en el repositorio y activa la fuente `main` / `(root)`.

---

## Cómo ejecutar localmente (Windows)

### Opción 1: Doble clic (Recomendado)

Haz doble clic en **`abrir.bat`** dentro de la carpeta `aplicacionWebEducativa/`.

Esto abrirá automáticamente la página en tu navegador predeterminado.

### Opción 2: PowerShell

Haz clic derecho sobre **`ABRIR.ps1`** → "Ejecutar con PowerShell".

### Opción 3: Abrir manualmente

Busca y abre el archivo **`index.html`** o **`landing.html`** directamente en tu navegador (Chrome, Edge, Firefox, etc.).

## Estructura del proyecto

```
aplicacionWebEducativa/
├── index.html         # Página de inicio local
├── landing.html       # Página principal (hero + contenido)
├── login.html         # Inicio de sesión
├── register.html      # Registro de usuarios
├── styles.css         # Estilos principales
├── script.js          # Lógica de la aplicación
├── firebase-config.js # Configuración de Firebase
├── abrir.bat          # Ejecutable Windows (doble clic)
├── ABRIR.ps1          # Ejecutable PowerShell
├── dashboard.html     # Panel de usuario (interno)
└── README.md          # Este archivo
```

## Características

- ✅ Diseño responsive y moderno
- ✅ Animaciones al scroll y partículas de fondo
- ✅ Autenticación con Firebase (Email/Password)
- ✅ Línea de tiempo interactiva con imágenes
- ✅ Visualizador de tokens
- ✅ Panel de usuario con logout
- ✅ Ejecutable para Windows (.bat y .ps1)

## Configuración de Firebase (Obligatorio)

Antes de que funcione el login/registro, debes configurar Firebase:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `talleria-2f756`
3. Ve a **Authentication → Sign-in method**
4. Activa **Email/Password** y guarda
5. Ve a **Authentication → Settings → Authorized domains**
6. Agrega `localhost` si pruebas localmente, o tu dominio de GitHub Pages si lo hospedas allí

## No requiere servidor

Este sitio es totalmente estático. No necesitas instalar Node.js, Python, ni ningún servidor web. Solo abre los archivos HTML directamente en tu navegador.
