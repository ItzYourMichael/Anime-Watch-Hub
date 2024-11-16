let currentPage = 1; // For infinite scrolling

// Search anime with filters
function searchAnime() {
  const query = document.getElementById("search-box").value.trim();
  const genre = document.getElementById("filter-genre").value;
  const sort = document.getElementById("sort-options").value;

  if (!query) {
    displayMessage("Please enter a search query.");
    return;
  }

  displayMessage("Searching...");
  fetchAnime(query, genre, sort, 1);
}

// Fetch anime from Jikan API with filters and pagination
function fetchAnime(query, genre, sort, page) {
  const genreFilter = genre ? `&genres=${genre}` : "";
  const url = `https://api.jikan.moe/v4/anime?q=${query}${genreFilter}&order_by=${sort}&page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.data && data.data.length > 0) {
        displayAnimeResults(data.data, page > 1); // Append for infinite scroll
      } else {
        displayMessage("No results found.");
      }
    })
    .catch((error) => {
      console.error(error);
      displayMessage("Error fetching data.");
    });
}

// Display anime results
function displayAnimeResults(animeList, append = false) {
  const resultsContainer = document.getElementById("search-results");
  if (!append) resultsContainer.innerHTML = ""; // Clear previous results

  animeList.forEach((anime) => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("card");

    animeCard.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score || "N/A"}</p>
      <button onclick="addToWatchlist('${anime.title}', '${anime.images.jpg.image_url}')">Add to Watchlist</button>
      <a href="${anime.url}" target="_blank">More Info</a>
    `;

    resultsContainer.appendChild(animeCard);
  });
}

// Infinite scroll: Load more anime
function loadMoreAnime() {
  const query = document.getElementById("search-box").value.trim();
  const genre = document.getElementById("filter-genre").value;
  const sort = document.getElementById("sort-options").value;

  currentPage++;
  fetchAnime(query, genre, sort, currentPage);
}

// Add to Watchlist
function addToWatchlist(title, image) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.push({ title, image });
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  displayWatchlist();
}

// Display Watchlist
function displayWatchlist() {
  const watchlistContainer = document.getElementById("watchlist-container");
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlistContainer.innerHTML = "";

  watchlist.forEach((anime) => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("card");

    animeCard.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}">
      <h3>${anime.title}</h3>
    `;

    watchlistContainer.appendChild(animeCard);
  });
}

// Display a message in the results container
function displayMessage(message) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = `<p>${message}</p>`;
}
