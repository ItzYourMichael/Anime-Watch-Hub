// Replace with your actual client ID from MyAnimeList
const clientId = '699bdb47b4de16e03049b6eb2a1b297a';

// Function to search anime from MyAnimeList
async function searchAnime(query) {
  try {
    const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
      headers: {
        'X-MAL-CLIENT-ID': clientId
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch anime data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] }; // Return an empty array if there's an error
  }
}

// Event listener for the search box
document.getElementById('searchBox').addEventListener('input', async (event) => {
  const query = event.target.value;
  if (query.length > 2) {
    const animeResults = await searchAnime(query);
    displayAnimeResults(animeResults);
  }
});

// Function to display anime search results
function displayAnimeResults(animeData) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (!animeData || animeData.data.length === 0) {
    resultsContainer.innerHTML = '<p>No results found.</p>';
    return;
  }

  animeData.data.forEach(anime => {
    const animeCard = document.createElement('div');
    animeCard.className = 'anime-card';
    animeCard.innerHTML = `
      <img src="${anime.node.main_picture ? anime.node.main_picture.medium : ''}" alt="${anime.node.title}">
      <h3>${anime.node.title}</h3>
    `;
    resultsContainer.appendChild(animeCard);
  });
}
