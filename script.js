const clientId = 'YOUR_CLIENT_ID_HERE'; // Replace with your actual MAL client ID

async function fetchPopularAnime() {
    try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime?limit=10`, {
            headers: {
                'X-MAL-CLIENT-ID': clientId
            }
        });
        const data = await response.json();
        displayAnimeResults(data);
    } catch (error) {
        console.error("Error fetching popular anime:", error);
    }
}

async function searchAnime(query) {
    try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
            headers: {
                'X-MAL-CLIENT-ID': clientId
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error searching anime:", error);
    }
}

function handleSearchInput(event) {
    const query = event.target.value;
    if (query.length > 2) {
        searchAnime(query).then(animeResults => displayAnimeResults(animeResults));
    }
}

function displayAnimeResults(animeData) {
    const resultsContainer = document.getElementById('animeGrid');
    resultsContainer.innerHTML = '';
    animeData.data.forEach(anime => {
        const animeCard = document.createElement('div');
        animeCard.className = 'anime-card';
        animeCard.innerHTML = `
            <img src="${anime.node.main_picture ? anime.node.main_picture.medium : 'default-logo.png'}" alt="${anime.node.title}">
            <h3>${anime.node.title}</h3>
        `;
        resultsContainer.appendChild(animeCard);
    });
}

// Load popular anime on page load
document.addEventListener("DOMContentLoaded", fetchPopularAnime);
