// anime.js

const clientId = '699bdb47b4de16e03049b6eb2a1b297a'; // Replace with your actual client ID

// Function to search anime from MyAnimeList API
async function searchAnime(query) {
  const response = await fetch(`https://api.myanimelist.net/v2/anime?q=${query}&limit=10`, {
    headers: {
      'X-MAL-CLIENT-ID': clientId
    }
  });
  const data = await response.json();
  return data;
}
