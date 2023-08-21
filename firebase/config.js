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
  apiKey: "AIzaSyAcW-lb4-7k7AQ76wQo0p7PqmcSheeva3Q",
  authDomain: "rn-social-9f0b1.firebaseapp.com",
  databaseURL:
    "https://rn-social-9f0b1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-social-9f0b1",
  storageBucket: "rn-social-9f0b1.appspot.com",
  messagingSenderId: "766123363814",
  appId: "1:766123363814:web:bb9de15888e39f5ee81a27",
  measurementId: "G-09EYWRB9G0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
