import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const resultsContainer = document.getElementById('results');
  const themeToggle = document.getElementById('themeToggle');
  const profileIcon = document.getElementById('profileIcon');
  const dropdown = document.getElementById('profileDropdown');

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    themeToggle.querySelector('img').src = `assets/icons/${newTheme}-mode.svg`;
  });

  // Profile Dropdown Toggle
  profileIcon.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  // Search Anime
  searchBox.addEventListener('input', async () => {
    const query = searchBox.value.trim();
    if (query.length > 2) {
      resultsContainer.innerHTML = '<div class="spinner"></div>'; // Show spinner
      try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
          headers: {
            'X-MAL-CLIENT-ID': '699bdb47b4de16e03049b6eb2a1b297a'
          }
        });
        const data = await response.json();
        displaySearchResults(data);
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  });

  function displaySearchResults(data) {
    resultsContainer.innerHTML = '';
    data.data.forEach((anime) => {
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <img src="${anime.node.main_picture.medium}" alt="${anime.node.title}">
        <h3>${anime.node.title}</h3>
      `;
      resultsContainer.appendChild(card);
    });
  }
});
