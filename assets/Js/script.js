// Delay for debounce functionality
let debounceTimeout = null;

// Debounce function to limit search requests
function debounceSearch() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(performSearch, 300); // Delay search by 300ms
}

// Function to perform search
function performSearch() {
  const searchQuery = document.getElementById("search-box").value.trim();

  if (searchQuery === "") {
    displayMessage("Please enter an anime name.");
    return;
  }

  // Show a loading message
  displayMessage("Searching...");

  // Fetch data from Jikan API
  fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.data && data.data.length > 0) {
        displayResults(data.data);
      } else {
        displayMessage("No results found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching anime data:", error);
      displayMessage("Failed to fetch data. Please try again later.");
    });
}

// Function to display search results
function displayResults(results) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = ""; // Clear previous results

  results.forEach((anime) => {
    const animeCard = document.createElement("div");
    animeCard.className = "card";

    animeCard.innerHTML = `
      <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
      <h3>${anime.title}</h3>
      <p>Score: ${anime.score || "N/A"}</p>
      <p>Episodes: ${anime.episodes || "N/A"}</p>
      <p>Status: ${anime.status || "N/A"}</p>
      <a href="${anime.url}" target="_blank">More Info</a>
    `;

    resultsContainer.appendChild(animeCard);
  });
}

// Function to display error or info messages
function displayMessage(message) {
  const resultsContainer = document.getElementById("search-results");
  resultsContainer.innerHTML = `<p>${message}</p>`;
}
