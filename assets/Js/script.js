document.addEventListener('DOMContentLoaded', () => {
  const searchBox = document.getElementById('searchBox');
  const animeResults = document.getElementById('animeResults');

  // Search Functionality
  document.getElementById('searchButton').addEventListener('click', async () => {
    const query = searchBox.value.trim();
    if (query.length > 0) {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      const data = await response.json();
      displayAnimeResults(data.data);
    } else {
      animeResults.innerHTML = '<p class="text-light">Please enter a search term.</p>';
    }
  });

  function displayAnimeResults(results) {
    animeResults.innerHTML = results.map(anime => `
      <div class="col-md-3">
        <div class="card">
          <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
          <div class="card-body">
            <h5 class="card-title">${anime.title}</h5>
          </div>
        </div>
      </div>
    `).join('');
  }
});
