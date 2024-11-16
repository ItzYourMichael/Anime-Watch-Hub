import { initializeApp } from "https://www.gstatic.com/firebasejs/9.24.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.24.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2tCpSCQ34aqHgeUaa6RMWNK2YsODI7sE",
    authDomain: "anime-watch-hub.firebaseapp.com",
    projectId: "anime-watch-hub",
    storageBucket: "anime-watch-hub.appspot.com",
    messagingSenderId: "257134543781",
    appId: "1:257134543781:web:90f243e87f2238bdb79e4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup function
export function signup(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Account created successfully!");
            window.location.href = "profile.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login function
export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "profile.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Handle logout
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                alert("Logged out successfully!");
                window.location.href = "login.html";
            })
            .catch((error) => {
                alert(error.message);
            });
    });
}

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    const userEmailElement = document.getElementById("user-email");
    if (user) {
        if (userEmailElement) {
            userEmailElement.textContent = `Welcome, ${user.email}`;
        }
    } else {
        if (userEmailElement) {
            userEmailElement.textContent = "You are not logged in.";
        }
        if (window.location.pathname.includes("profile.html")) {
            window.location.href = "login.html";
        }
    }
});
