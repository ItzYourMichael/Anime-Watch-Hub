// script.js

// Handle search input and call searchAnime function
async function handleSearch() {
  const query = document.getElementById('searchBox').value;
  if (query.length > 2) {
    const animeResults = await searchAnime(query);
    displayAnimeResults(animeResults);
  }
}

// Function to display search results in anime grid
function displayAnimeResults(animeData) {
  const resultsContainer = document.getElementById('animeGrid');
  resultsContainer.innerHTML = ''; // Clear previous results
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
