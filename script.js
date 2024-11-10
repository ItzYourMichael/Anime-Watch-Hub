// Sample list of anime (you can replace this with data from Firestore later)
const animeList = [
  { name: "Naruto", description: "Ninja adventures", imageUrl: "https://example.com/naruto.jpg" },
  { name: "One Piece", description: "Pirate journeys", imageUrl: "https://example.com/onepiece.jpg" },
  { name: "Attack on Titan", description: "Humanity's fight for survival", imageUrl: "https://example.com/aot.jpg" }
];

// Display anime items on page load
function displayAnime(animes) {
  const animeGrid = document.getElementById("animeGrid");
  animeGrid.innerHTML = ""; // Clear previous results
  animes.forEach(anime => {
    const animeItem = document.createElement("div");
    animeItem.classList.add("anime-item");
    animeItem.innerHTML = `
      <img src="${anime.imageUrl}" alt="${anime.name}">
      <h3>${anime.name}</h3>
      <p>${anime.description}</p>
    `;
    animeGrid.appendChild(animeItem);
  });
}

// Filter anime list based on search input
function searchAnime() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredAnime = animeList.filter(anime =>
    anime.name.toLowerCase().includes(query)
  );
  displayAnime(filteredAnime);
}

// Profile Menu Toggle
function toggleProfileMenu() {
  const profileMenu = document.getElementById("profileMenu");
  profileMenu.classList.toggle("hidden");
}

// Initial display of all anime
displayAnime(animeList);
