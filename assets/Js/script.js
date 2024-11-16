// Perform search when the user clicks the search button or types in the search box
function performSearch() {
  const searchQuery = document.getElementById('search-box').value.trim();

  if (searchQuery === '') {
    displayResults([]);
    return;
  }

  // Fetch data from Jikan API
  fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.data) {
        displayResults(data.data); // Pass the anime results to the display function
      } else {
        displayResults([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching anime data:', error);
      displayError('Failed to fetch data. Please try again later.');
    });
}

// Display search results dynamically
function displayResults(results) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p class="text-danger">No results found.</p>';
    return;
  }

  results.forEach((anime) => {
    const animeCard = document.createElement('div');
    animeCard.className = 'card';
    animeCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${anime.title}</h5>
        <p class="card-text">Score: ${anime.score || 'N/A'}</p>
        <p class="card-text">Episodes: ${anime.episodes || 'N/A'}</p>
        <p class="card-text">Status: ${anime.status || 'N/A'}</p>
        <a href="${anime.url}" target="_blank" class="btn btn-primary">More Info</a>
      </div>
    `;
    resultsContainer.appendChild(animeCard);
  });
}

// Display error messages
function displayError(message) {
  const resultsContainer = document.getElementById('search-results');
  resultsContainer.innerHTML = `<p class="text-danger">${message}</p>`;
}
