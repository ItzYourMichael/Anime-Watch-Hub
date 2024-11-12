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

// Event listener for search input
document.getElementById('searchBox').addEventListener('input', async (event) => {
  const query = event.target.value.trim();
  if (query.length > 2) {
    const animeResults = await searchAnime(query);
    displayAnimeResults(animeResults);
  } else {
    document.getElementById('results').innerHTML = ''; // Clear results if query is too short
  }
});

// Function to display anime results
function displayAnimeResults(animeData) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  animeData.data.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.className = 'anime-card';
    animeCard.style = "border: 1px solid #ddd; padding: 10px; text-align: center; width: 150px; border-radius: 8px;";

    animeCard.innerHTML = `
      <img src="${anime.node.main_picture.medium}" alt="${anime.node.title}" style="width: 100%; border-radius: 5px;">
      <h3 style="font-size: 1em; margin: 10px 0;">${anime.node.title}</h3>
    `;
    resultsContainer.appendChild(animeCard);
  });
}
