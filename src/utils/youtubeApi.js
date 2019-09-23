export async function getVideos() {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUAseX9IBXkoSZdxMX_41jag&key=AIzaSyBHR2gkb9Jt_OIi25JLHsvhAMTfPe7EYfM&part=snippet&maxResults=50';
    try {
        const response = await fetch(url);
        const { items } = await response.json();
        return items;
    } catch (error) {
        console.error(error);
    }
}