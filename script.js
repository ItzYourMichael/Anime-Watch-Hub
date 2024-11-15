import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profileIcon');
  const loginLink = document.getElementById('loginLink');
  const profileLink = document.getElementById('profileLink');
  const logoutLink = document.getElementById('logoutLink');
  const toggleThemeButton = document.getElementById('toggleTheme');

  // Handle login
  loginLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      updateProfileUI(result.user);
    } catch (error) {
      console.error("Login error:", error);
    }
  });

  // Handle logout
  logoutLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      resetProfileUI();
    } catch (error) {
      console.error("Logout error:", error);
    }
  });

  // Theme toggle
  toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });

  // Auth state listener
  onAuthStateChanged(auth, (user) => {
    user ? updateProfileUI(user) : resetProfileUI();
  });

  function updateProfileUI(user) {
    profileIcon.src = user.photoURL || "assets/Profiles/default-profile.png";
    profileLink.textContent = user.displayName || "Profile";
    loginLink.style.display = 'none';
    logoutLink.style.display = 'block';
  }

  function resetProfileUI() {
    profileIcon.src = "assets/Profiles/default-profile.png";
    profileLink.textContent = "Profile";
    loginLink.style.display = 'block';
    logoutLink.style.display = 'none';
  }

  // Close the profile dropdown when right-click (context menu) is triggered
  document.addEventListener('contextmenu', () => {
    const dropdown = document.querySelector('.profile-dropdown');
    if (dropdown) dropdown.style.display = 'none';
  });
});
