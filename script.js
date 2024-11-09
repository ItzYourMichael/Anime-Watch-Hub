// Function to display anime list
function displayAnimeList(animeData) {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = '';
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

// Search Anime
async function searchAnime() {
    const query = document.getElementById("search").value;
    if (query) {
        const data = await getAnimeData(query);
        displayAnimeList(data);
    }
}

// Login Function
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "user" && password === "password") { // Sample credentials
        alert("Welcome to Anime Watch Hub, " + username + "!");
        window.location.href = "index.html"; // Redirect to main page
    } else {
        alert("Invalid username or password");
    }
}
