// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2tCpSCQ34aqHgeUaa6RMWNK2YsODI7sE",
  authDomain: "anime-watch-hub.firebaseapp.com",
  projectId: "anime-watch-hub",
  storageBucket: "anime-watch-hub.appspot.com",
  messagingSenderId: "257134543781",
  appId: "1:257134543781:web:90f243e87f2238bdb79e4c",
  measurementId: "G-H12TTJRBKF"
};

// Initialize Firebase and services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google login function
function googleLogin() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User logged in:", result.user);
      window.location.href = "index.html"; // Redirect to home page
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}

// Export the login function if needed elsewhere
export { googleLogin };
