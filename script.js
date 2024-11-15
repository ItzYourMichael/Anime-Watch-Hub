import { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const profileIcon = document.getElementById('profileIcon');
  const profileDropdown = document.querySelector('.profile-dropdown');
  const searchInput = document.getElementById('searchInput');
  const featuredGrid = document.querySelector('.featured-grid');
  const trendingList = document.querySelector('.trending-list');
  const toggleThemeButton = document.getElementById('toggleTheme');
  let isDarkTheme = true;

  // Toggle profile dropdown
  profileIcon.addEventListener('click', () => {
    profileDropdown.classList.toggle('hidden');
  });

  // Theme toggle
  toggleThemeButton.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.style.backgroundColor = isDarkTheme ? '#121212' : '#ffffff';
    document.body.style.color = isDarkTheme ? '#ffffff' : '#000000';
  });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    // Perform search and update UI with results
    console.log(`Searching for: ${query}`);
  });

  // Display featured and trending anime
  function displayAnime() {
    const animeData = [
      { title: "Attack on Titan", image: "assets/attack_on_titan.jpg" },
      { title: "My Hero Academia", image: "assets/my_hero_academia.jpg" },
      // Add more anime data here
    ];

    animeData.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.classList.add('anime-card');
      animeCard.innerHTML = `<img src="${anime.image}" alt="${anime.title}"><p>${anime.title}</p>`;
      featuredGrid.appendChild(animeCard);
      trendingList.appendChild(animeCard.cloneNode(true)); // Clone for trending
    });
  }

  displayAnime();

  // Firebase Authentication (Sample)
  const loginLink = document.getElementById('loginLink');
  loginLink.addEventListener('click', async () => {
    await signInWithPopup(auth, provider);
  });

  // Detect auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      document.getElementById('profileLink').textContent = user.displayName || "Profile";
      document.getElementById('profileIcon').src = user.photoURL || "assets/Profiles/default-profile.png";
      profileDropdown.querySelector('#loginLink').classList.add('hidden');
      profileDropdown.querySelector('#logoutLink').classList.remove('hidden');
    }
  });
});
