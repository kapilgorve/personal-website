export function extractCoverUrl(html){
    if (html.includes('img')) {
        const rex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
        const coverMatch = rex.exec(html)
        const cover = coverMatch[1];
        return cover;
      }
}