import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profileIcon');
  const profileDropdown = document.querySelector('.profile-dropdown');
  const loginLink = document.getElementById('loginLink');
  const profileLink = document.getElementById('profileLink');
  const logoutLink = document.getElementById('logoutLink');
  const toggleThemeButton = document.getElementById('toggleTheme');
  let isDarkTheme = true;

  // Toggle profile dropdown
  profileIcon.addEventListener('click', () => {
    profileDropdown.classList.toggle('hidden');
  });

  // Login functionality
  loginLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Update UI to reflect logged-in state
      profileIcon.src = user.photoURL || "assets/Profiles/default-profile.png";
      profileDropdown.querySelector('#loginLink').classList.add('hidden');
      profileDropdown.querySelector('#logoutLink').classList.remove('hidden');
      profileLink.textContent = user.displayName || "Profile";
    } catch (error) {
      console.error("Login error:", error);
    }
  });

  // Logout functionality
  logoutLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      profileIcon.src = "assets/Profiles/default-profile.png";
      profileDropdown.querySelector('#loginLink').classList.remove('hidden');
      profileDropdown.querySelector('#logoutLink').classList.add('hidden');
      profileLink.textContent = "Profile";
    } catch (error) {
      console.error("Logout error:", error);
    }
  });

  // Toggle theme functionality
  toggleThemeButton.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.style.backgroundColor = isDarkTheme ? '#121212' : '#ffffff';
    document.body.style.color = isDarkTheme ? '#ffffff' : '#000000';
  });

  // Detect auth state change
  onAuthStateChanged(auth, (user) => {
    if (user) {
      profileIcon.src = user.photoURL || "assets/Profiles/default-profile.png";
      profileLink.textContent = user.displayName || "Profile";
      loginLink.classList.add('hidden');
      logoutLink.classList.remove('hidden');
    } else {
      profileIcon.src = "assets/Profiles/default-profile.png";
      loginLink.classList.remove('hidden');
      logoutLink.classList.add('hidden');
      profileLink.textContent = "Profile";
    }
  });
});
