export function extractCoverUrl(html){
    if (html.includes('img')) {
        const rex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
        const coverMatch = rex.exec(html)
        return coverMatch ? coverMatch[1] : null;
      }
      return null;
}