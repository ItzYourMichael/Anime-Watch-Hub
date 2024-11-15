import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profileIcon');
  const loginLink = document.getElementById('loginLink');
  const profileLink = document.getElementById('profileLink');
  const logoutLink = document.getElementById('logoutLink');
  const toggleThemeButton = document.getElementById('toggleTheme');
  const searchBox = document.getElementById('searchBox');
  const animeResults = document.getElementById('animeResults');

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

  // Handle search
  searchBox.addEventListener('input', async (e) => {
    const query = e.target.value;
    if (query.length > 2) {
      const response = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&page=1`);
      const data = await response.json();
      animeResults.innerHTML = data.results.map(anime => `
        <div>
          <h4>${anime.title}</h4>
          <img src="${anime.image_url}" alt="${anime.title}">
        </div>
      `).join('');
    } else {
      animeResults.innerHTML = '';
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
});
