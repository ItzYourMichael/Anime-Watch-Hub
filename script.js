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
