export async function getVideos() {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUAseX9IBXkoSZdxMX_41jag&key=AIzaSyCf5nsME4Fh9Io4qT5jCCCPB28iD7o_y5o&part=snippet&maxResults=50';
    try {
        const response = await fetch(url);
        const { items } = await response.json();
        return items;
    } catch (error) {
        console.error(error);
    }
}