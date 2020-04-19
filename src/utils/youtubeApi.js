export async function getVideos() {
    const playlistId = 'PLrm1PQpqTwnb69CNEGG5_MYERivErUDr0'; //name -Featured on Portfolio Site
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${process.env.GATSBY_YOUTUBE_KEY}&part=snippet&maxResults=50`;
    try {
        const response = await fetch(url);
        const { items } = await response.json();
        return items;
    } catch (error) {
        console.error(error);
    }
}