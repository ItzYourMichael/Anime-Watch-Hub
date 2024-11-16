let currentPage = 1;

// Search anime
function searchAnime() {
  const query = document.getElementById("search-box").value.trim();
  const genre = document.getElementById("filter-genre").value;
  const sort = document.getElementById("sort-options").value;

  if (!query) {
    alert("Please enter an anime name!");
    return;
  }

  fetchAnime(query, genre, sort, 1);
}

// Fetch anime from Jikan API
function fetchAnime(query, genre, sort, page) {
  const genreFilter = genre ? `&genres=${genre}` : "";
  const url = `https://api.jikan.moe/v4/anime?q=${query}${genreFilter}&order_by=${sort}&page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.data && data.data.length > 0) {
        displayAnimeResults(data.data, page > 1);
      } else {
        alert("No results found.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Error fetching anime. Please try again.");
    });
}

// Display anime results
function displayAnimeResults(animeList, append = false) {
  const resultsContainer = document.getElementById("search-results");
  if (!append) resultsContainer.innerHTML = "";

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score || "N/A"}</p>
      <button onclick="addToWatchlist('${anime.title}', '${anime.images.jpg.image_url}')">Add to Watchlist</button>
      <a href="${anime.url}" target="_blank">More Info</a>
    `;

    resultsContainer.appendChild(card);
  });
}

// Add to watchlist
function addToWatchlist(title, image) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.push({ title, image });
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  displayWatchlist();
}

// Display watchlist
function displayWatchlist() {
  const container = document.getElementById("watchlist-container");
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  container.innerHTML = "";

  watchlist.forEach((anime) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}">
      <h3>${anime.title}</h3>
    `;

    container.appendChild(card);
  });
}
