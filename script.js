// Sample anime data arrays
const animeList = [
  { name: "Naruto", description: "Ninja adventures", imageUrl: "https://example.com/naruto.jpg" },
  { name: "One Piece", description: "Pirate adventures", imageUrl: "https://example.com/onepiece.jpg" },
  { name: "Attack on Titan", description: "Humanity vs Titans", imageUrl: "https://example.com/aot.jpg" }
];

const upcomingAnime = [
  { name: "Demon Slayer: Swordsmith Village", description: "New Arc of Demon Slayer", imageUrl: "https://example.com/demonslayer.jpg" },
  { name: "Jujutsu Kaisen Season 2", description: "Continuation of Jujutsu Kaisen", imageUrl: "https://example.com/jujutsu.jpg" }
];

// Populate anime sections
function displayAnime(animeArray, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear any existing content
  animeArray.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    animeCard.innerHTML = `
      <img src="${anime.imageUrl}" alt="${anime.name}">
      <div class="info">
        <h3>${anime.name}</h3>
        <p>${anime.description}</p>
      </div>
    `;
    container.appendChild(animeCard);
  });
}

// Initial display of all anime and upcoming anime
displayAnime(upcomingAnime, "upcomingGrid");
displayAnime(animeList, "animeGrid");

// Search functionality
function searchAnime() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredAnime = animeList.filter(anime =>
    anime.name.toLowerCase().includes(query)
  );
  displayAnime(filteredAnime, "animeGrid");
}
