// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2tCpSCQ34aqHgeUaa6RMWNK2YsODI7sE",
  authDomain: "anime-watch-hub.firebaseapp.com",
  projectId: "anime-watch-hub",
  storageBucket: "anime-watch-hub.firebasestorage.app",
  messagingSenderId: "257134543781",
  appId: "1:257134543781:web:90f243e87f2238bdb79e4c",
  measurementId: "G-H12TTJRBKF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);