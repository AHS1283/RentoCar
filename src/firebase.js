

import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtn4x80Wh1jfMhfzwwA8urUHMwt9YMQy0",
  authDomain: "rentocar-28bfa.firebaseapp.com",
  projectId: "rentocar-28bfa",
  storageBucket: "rentocar-28bfa.firebasestorage.app",
  messagingSenderId: "773956586560",
  appId: "1:773956586560:web:5623d7cabb87e9916123a5",
  measurementId: "G-YT6190GX00"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const storage = getStorage(app);
export default app;

// =========================================================
// FIREBASE CONFIG
// =========================================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use an existing one)
// 3. Project settings -> General -> "Your apps" -> Web app (</>)
// 4. Copy the config object Firebase gives you and paste the
//    values below in place of the placeholders.
// 5. In the Firebase console, also enable:
//      - Authentication -> Sign-in method -> Email/Password
//      - Firestore Database -> Create database
//      - Storage -> Get started
// 6. Create your first admin user:
//      Authentication -> Users -> Add user (email + password)
//      This is the login you will use for /admin/login
// =========================================================




