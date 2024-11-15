const clientId = 'YOUR_CLIENT_ID_HERE'; // Replace with your actual MyAnimeList client ID

// Function to fetch popular anime by default
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

// Function to search for anime
async function searchAnime(query) {
    try {
        const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(query)}&limit=10`, {
            headers: {
                'X-MAL-CLIENT-ID': clientId
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error searching for anime:", error);
        return null;
    }
}

// Event handler for search input
function handleSearchInput(event) {
    const query = event.target.value.trim();
    if (query.length > 2) {
        searchAnime(query).then(animeResults => {
            if (animeResults) {
                displayAnimeResults(animeResults);
            } else {
                console.error("No anime results found.");
            }
        });
    }
}

// Function to display anime results
function displayAnimeResults(animeData) {
    const resultsContainer = document.getElementById('animeGrid');
    resultsContainer.innerHTML = '';

    if (animeData && animeData.data && animeData.data.length > 0) {
        animeData.data.forEach(anime => {
            const animeCard = document.createElement('div');
            animeCard.className = 'anime-card';
            animeCard.innerHTML = `
                <img src="${anime.node.main_picture ? anime.node.main_picture.medium : 'default-logo.png'}" alt="${anime.node.title}">
                <h3>${anime.node.title}</h3>
            `;
            resultsContainer.appendChild(animeCard);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

// Load popular anime on page load
document.addEventListener("DOMContentLoaded", fetchPopularAnime);

// Attach event listener to the search box
document.getElementById('searchBox').addEventListener('input', handleSearchInput);
