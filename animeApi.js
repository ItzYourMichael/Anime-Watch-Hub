async function getAnimeData(query) {
    const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query ($search: String) {
                    Page(page: 1, perPage: 12) {
                        media(search: $search, type: ANIME) {
                            title {
                                romaji
                            }
                            coverImage {
                                large
                            }
                            genres
                        }
                    }
                }
            `,
            variables: { search: query }
        })
    });

    const result = await response.json();
    return result.data.Page.media;
}
