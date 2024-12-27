// Importar os módulos do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBPYWkjI02UlNkDstXZ4oeIs2sL1WG0AAg",
  authDomain: "meu-painel-alura.firebaseapp.com",
  projectId: "meu-painel-alura",
  storageBucket: "meu-painel-alura.appspot.com",
  messagingSenderId: "854143721967",
  appId: "1:854143721967:web:7bd6d72db840648c9c161a"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore e Autenticação
const db = getFirestore(app);
const auth = getAuth(app);

// Exportar Firestore e Auth para usar em outros scripts
export { db, auth };
