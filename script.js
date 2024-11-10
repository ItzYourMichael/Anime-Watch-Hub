// Sample list of anime
const animeList = [
  { name: "Naruto", imageUrl: "https://example.com/naruto.jpg" },
  { name: "One Piece", imageUrl: "https://example.com/onepiece.jpg" },
  { name: "Attack on Titan", imageUrl: "https://example.com/aot.jpg" },
  { name: "Demon Slayer", imageUrl: "https://example.com/demonslayer.jpg" },
  { name: "My Hero Academia", imageUrl: "https://example.com/mha.jpg" }
];

// Function to display anime items
function displayAnime(animes) {
  const grid = document.getElementById("animeGrid");
  grid.innerHTML = ""; // Clear previous results
  animes.forEach(anime => {
    const animeItem = document.createElement("div");
    animeItem.classList.add("anime-item");
    animeItem.innerHTML = `
      <img src="${anime.imageUrl}" alt="${anime.name}">
      <h3>${anime.name}</h3>
    `;
    grid.appendChild(animeItem);
  });
}

// Search function
function searchAnime() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filteredAnime = animeList.filter(anime =>
    anime.name.toLowerCase().includes(query)
  );
  displayAnime(filteredAnime);
}

// Display all anime initially
displayAnime(animeList);
