import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2tCpSCQ34aqHgeUaa6RMWNK2YsODI7sE",
  authDomain: "anime-watch-hub.firebaseapp.com",
  projectId: "anime-watch-hub",
  storageBucket: "anime-watch-hub.appspot.com",
  messagingSenderId: "257134543781",
  appId: "1:257134543781:web:90f243e87f2238bdb79e4c",
  measurementId: "G-H12TTJRBKF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
