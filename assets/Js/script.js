// Load anime data from anime-data.json
let animeList = [];

fetch('assets/anime-data.json')
  .then((response) => response.json())
  .then((data) => {
    animeList = data;
  })
  .catch((error) => console.error('Error loading anime data:', error));

// Perform search when the user clicks the search button or types in the search box
function performSearch() {
  const searchQuery = document.getElementById('search-box').value.toLowerCase();
  const results = animeList.filter((anime) =>
    anime.title.toLowerCase().includes(searchQuery)
  );

  displayResults(results);
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
        <p class="card-text">Genre: ${anime.genre}</p>
        <p class="card-text">Year: ${anime.year} | Rating: ${anime.rating}</p>
      </div>
    `;
    resultsContainer.appendChild(animeCard);
  });
}
