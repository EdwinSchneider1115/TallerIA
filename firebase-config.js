// Configuración de Firebase
// Reemplaza con tus propias credenciales de Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBtxMJju-8hOMdqFhLL85TLXzTcMCY3D44",
  authDomain: "talleria-2f756.firebaseapp.com",
  projectId: "talleria-2f756",
  storageBucket: "talleria-2f756.firebasestorage.app",
  messagingSenderId: "590645983040",
  appId: "1:590645983040:web:7e6a816e5b5954de04aca5",
  measurementId: "G-8NCD93QMGR"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
