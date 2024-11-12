
// Import Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get anime list from Firebase
async function loadAnimeList() {
  const querySnapshot = await getDocs(collection(db, "animeList"));
  const animeGrid = document.getElementById("animeGrid");
  animeGrid.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const animeData = doc.data();
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    animeCard.innerHTML = `
      <img src="${animeData.imageUrl}" alt="${animeData.name}">
      <h3>${animeData.name}</h3>
      <p>${animeData.description}</p>
      <a href="${animeData.malUrl}" target="_blank">View on MAL</a>
    `;
    animeGrid.appendChild(animeCard);
  });
}

// Call function to load anime list on page load
window.onload = loadAnimeList;

// Search function
function searchAnime() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const animeCards = document.querySelectorAll(".anime-card");
  animeCards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "block" : "none";
  });
}

const clientId = '699bdb47b4de16e03049b6eb2a1b297a'; // Replace with your actual client ID

// Function to search anime from MyAnimeList
async function searchAnime(query) {
  const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
    headers: {
      'X-MAL-CLIENT-ID': clientId
    }
  });
  const data = await response.json();
  return data;
}

// Example usage
document.getElementById('searchBox').addEventListener('input', async (event) => {
  const query = event.target.value;
  if (query.length > 2) {
    const animeResults = await searchAnime(query);
    displayAnimeResults(animeResults);
  }
});

function displayAnimeResults(animeData) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  animeData.data.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.className = 'anime-card';
    animeCard.innerHTML = `
      <img src="${anime.node.main_picture.medium}" alt="${anime.node.title}">
      <h3>${anime.node.title}</h3>
    `;
    resultsContainer.appendChild(animeCard);
  });
}

