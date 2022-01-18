export async function getVideos() {
    const playlistId = 'PLrm1PQpqTwnb69CNEGG5_MYERivErUDr0'; //name -Featured on Portfolio Site
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${process.env.GATSBY_YOUTUBE_KEY}&part=snippet&maxResults=50`;
    try {
        const response = await fetch(url);
        const { items } = await response.json();
        const sorted =  items.sort( (data1, data2) => {
            if (data1.snippet.publishedAt < data2.snippet.publishedAt) {
                return 1;
            }
            if (data1.snippet.publishedAt > data2.snippet.publishedAt) {
                return -1;
            }
            return 0;
        } );
        console.log(sorted);
        return sorted;
    } catch (error) {
        console.error(error);
    }
}