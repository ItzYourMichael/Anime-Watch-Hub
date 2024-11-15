import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profileIcon');
  const dropdown = document.getElementById('profileDropdown');
  const loginBtn = document.getElementById('loginBtn');
  const profileBtn = document.getElementById('profileBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const greetingMessage = document.getElementById('greetingMessage');
  const usernameSpan = document.getElementById('username');

  let userProfile = {
    username: '',
    profilePic: 'assets/Profiles/default-profile.png',
  };

  // Monitor authentication state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      userProfile.username = user.displayName || 'Anime Fan';
      userProfile.profilePic = user.photoURL || 'assets/Profiles/default-profile.png';

      loginBtn.classList.add('hidden');
      logoutBtn.classList.remove('hidden');
      profileBtn.classList.remove('hidden');
      greetingMessage.classList.remove('hidden');
      usernameSpan.textContent = userProfile.username;
      profileIcon.src = userProfile.profilePic;
    } else {
      // User is logged out
      loginBtn.classList.remove('hidden');
      logoutBtn.classList.add('hidden');
      profileBtn.classList.add('hidden');
      greetingMessage.classList.add('hidden');
      profileIcon.src = 'assets/Profiles/default-profile.png';
    }
  });

  // Login with Google
  loginBtn.addEventListener('click', async () => {
    try {
      await signInWithPopup(auth, provider);
      alert('Successfully logged in!');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  });

  // Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      alert('Successfully logged out!');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  });

  // Toggle dropdown on profile icon click
  profileIcon.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!profileIcon.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });
});
