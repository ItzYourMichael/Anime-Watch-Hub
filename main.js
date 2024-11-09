// main.js
import { auth, provider, signInWithPopup, signOut } from "./firebase-config.js";

// Elements
const loginButton = document.getElementById("login");
const logoutButton = document.getElementById("logout");

// Google Login
loginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in:", user.displayName);

            // Show welcome message and adjust button visibility
            document.querySelector(".content").innerHTML = `<h2>Welcome, ${user.displayName}!</h2><p>Enjoy your personalized anime experience.</p>`;
            loginButton.style.display = "none";
            logoutButton.style.display = "block";
        })
        .catch((error) => {
            console.error("Error during sign-in:", error);
            alert("Login failed. Please try again.");
        });
});

// Google Logout
logoutButton.addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out.");

            // Reset content and adjust button visibility
            document.querySelector(".content").innerHTML = `<h2>Welcome to Anime Watch Hub</h2><p>Log in to save your favorite anime to your watchlist, view recommendations, and join the discussion.</p>`;
            loginButton.style.display = "block";
            logoutButton.style.display = "none";
        })
        .catch((error) => {
            console.error("Error during sign-out:", error);
            alert("Logout failed. Please try again.");
        });
});
