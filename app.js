function showTab(tab) {
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tab).classList.add('active');
}

function goHome() {
    showTab('home');
}

function searchAnime() {
    const query = document.getElementById("search-input").value;
    // Firebase or API call to search anime
    document.getElementById("search-results").innerText = `Searching for "${query}"...`;
}

function recommendAnime() {
    const genre = document.getElementById("genre-select").value;
    // Firebase or API call to get recommendations based on genre
    document.getElementById("recommend-results").innerText = `Recommending anime in "${genre}" genre...`;
}
