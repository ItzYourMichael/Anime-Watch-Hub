// Initialize watch list and comments
const watchList = JSON.parse(localStorage.getItem("watchList")) || [];
const comments = JSON.parse(localStorage.getItem("comments")) || {};

// Toggle dark theme
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme"));
}

// Add anime to watch list
function addToWatchList(anime) {
    if (!watchList.includes(anime.title)) {
        watchList.push(anime);
        localStorage.setItem("watchList", JSON.stringify(watchList));
        alert("Added to Watch List!");
    }
}

// Display anime details
function loadAnimeDetails(animeId) {
    // Use animeId to fetch and display anime data here
    const animeDetails = document.getElementById("anime-details");
    // Assuming fetchAnimeDetails(animeId) returns an anime object
    const anime = fetchAnimeDetails(animeId);
    animeDetails.innerHTML = `
        <h2>${anime.title}</h2>
        <p>${anime.plot}</p>
        <a href="${anime.watchLink}" target="_blank">Watch Now</a>
    `;
}

// Add a comment to anime
function addComment(animeId) {
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value.trim();
    if (commentText) {
        comments[animeId] = comments[animeId] || [];
        comments[animeId].push(commentText);
        localStorage.setItem("comments", JSON.stringify(comments));
        displayComments(animeId);
        commentInput.value = "";
    }
}

// Display comments for an anime
function displayComments(animeId) {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = "";
    (comments[animeId] || []).forEach(comment => {
        const li = document.createElement("li");
        li.textContent = comment;
        commentsList.appendChild(li);
    });
}

// Function to search anime
async function searchAnime() {
    const query = document.getElementById("search").value;
    if (query) {
        const data = await getAnimeData(query);
        displayAnimeList(data);
    }
}

// Display anime list
function displayAnimeList(animeData) {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = '';
    animeData.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");
        animeCard.innerHTML = `
            <img src="${anime.coverImage.large}" alt="${anime.title.romaji}">
            <h3>${anime.title.romaji}</h3>
            <button onclick="loadAnimeDetails('${anime.id}')">More Details</button>
        `;
        animeList.appendChild(animeCard);
    });
}
