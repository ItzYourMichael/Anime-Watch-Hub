// Profile & Login/Logout Logic
document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profile-icon");
    const profileMenu = document.getElementById("profile-menu");
    const logoutBtn = document.getElementById("logout-btn");

    // Firebase Auth State Change
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // Logged-in user
            profileIcon.src = user.photoURL || "assets/icons/default-user.png";
            document.querySelector("#login-link").classList.add("hidden");
            document.querySelector("#signup-link").classList.add("hidden");
            document.querySelector("#profile-link").classList.remove("hidden");
            logoutBtn.classList.remove("hidden");
        } else {
            // Logged-out state
            profileIcon.src = "assets/icons/user.png";
            document.querySelector("#login-link").classList.remove("hidden");
            document.querySelector("#signup-link").classList.remove("hidden");
            document.querySelector("#profile-link").classList.add("hidden");
            logoutBtn.classList.add("hidden");
        }
    });

    // Logout
    logoutBtn.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
            alert("Logged out successfully!");
            window.location.href = "index.html";
        });
    });

    // Profile Dropdown Toggle
    profileIcon.addEventListener("click", () => {
        profileMenu.classList.toggle("hidden");
    });
});
