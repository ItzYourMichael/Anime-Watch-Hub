// Jikan API Base URL
const API_URL = "https://api.jikan.moe/v4/anime?q=";
const RANDOM_URL = "https://api.jikan.moe/v4/random/anime";

// Search Anime Function
async function searchAnime() {
    const query = document.getElementById("search-box").value.trim();
    const resultsContainer = document.getElementById("search-results");
    const loadingSpinner = document.getElementById("loading-spinner");

    if (!query) {
        alert("Please enter an anime name!");
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove("hidden");

    try {
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();

        // Clear previous results
        resultsContainer.innerHTML = "";
        loadingSpinner.classList.add("hidden");

        if (data.data && data.data.length > 0) {
            data.data.forEach((anime) => {
                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                    <h3>${anime.title}</h3>
                    <p>Score: ${anime.score || "N/A"}</p>
                    <a href="${anime.url}" target="_blank">More Info</a>
                `;

                resultsContainer.appendChild(card);
            });
        } else {
            resultsContainer.innerHTML = "<p>No results found.</p>";
        }
    } catch (error) {
        console.error("Error fetching anime data:", error);
        resultsContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}

// Fetch Random Anime
async function fetchRandomAnime() {
    const resultsContainer = document.getElementById("random-results");

    try {
        const response = await fetch(RANDOM_URL);
        const anime = await response.json();

        // Clear previous results
        resultsContainer.innerHTML = "";

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${anime.data.images.jpg.image_url}" alt="${anime.data.title}">
            <h3>${anime.data.title}</h3>
            <p>Score: ${anime.data.score || "N/A"}</p>
            <a href="${anime.data.url}" target="_blank">More Info</a>
        `;

        resultsContainer.appendChild(card);
    } catch (error) {
        console.error("Error fetching random anime:", error);
        resultsContainer.innerHTML = "<p>Error fetching data. Please try again later.</p>";
    }
}
