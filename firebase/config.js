// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
//storage img
import "firebase/storage";
//database
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtFmc2mDRwvucyRXlHvVHB_pjWTJTEW2Q",
  authDomain: "rn-social-a76db.firebaseapp.com",
  projectId: "rn-social-a76db",
  storageBucket: "rn-social-a76db.appspot.com",
  messagingSenderId: "350429280272",
  appId: "1:350429280272:web:693213be96e5066a747295",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
