// Function to display anime cards
function displayAnimeList(animeData) {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = ''; // Clear existing anime cards

    animeData.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");
        animeCard.innerHTML = `
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <div class="anime-info">
                <h3>${anime.title.romaji}</h3>
                <p>${anime.genres.join(", ")}</p>
            </div>
        `;
        animeList.appendChild(animeCard);
    });
}

// Function to search for anime
async function searchAnime() {
    const query = document.getElementById("search").value;
    if (query) {
        const data = await getAnimeData(query);
        displayAnimeList(data);
    }
}
