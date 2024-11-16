import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2tCpSCQ34aqHgeUaa6RMWNK2YsODI7sE",
  authDomain: "anime-watch-hub.firebaseapp.com",
  projectId: "anime-watch-hub",
  storageBucket: "anime-watch-hub.appspot.com",
  messagingSenderId: "257134543781",
  appId: "1:257134543781:web:90f243e87f2238bdb79e4c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function signup(email, password) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
        window.location.href = "index.html";
    } catch (error) {
        console.error(error.message);
    }
}

export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.href = "index.html";
    } catch (error) {
        console.error(error.message);
    }
}

export function logout() {
    signOut(auth)
        .then(() => {
            alert("Logged out!");
            window.location.href = "login.html";
        })
        .catch((error) => console.error(error.message));
}
