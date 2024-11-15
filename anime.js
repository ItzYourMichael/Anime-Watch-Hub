const clientId = '699bdb47b4de16e03049b6eb2a1b297a';

// Function to search anime from MyAnimeList
async function searchAnime(query) {
    const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
        headers: {
            'X-MAL-CLIENT-ID': clientId
        }
    });
    const data = await response.json();
    return data.data;
}

// Display Anime Results
function displayAnimeResults(animeList) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    animeList.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.innerHTML = `
            <img src="${anime.node.main_picture.medium}" alt="${anime.node.title}">
            <h3>${anime.node.title}</h3>
        `;
        resultsContainer.appendChild(animeCard);
    });
}

// Attach search functionality
document.getElementById('searchBox').addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        const animeList = await searchAnime(query);
        displayAnimeResults(animeList);
    }
});
