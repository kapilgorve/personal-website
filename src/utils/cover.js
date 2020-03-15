export function extractCoverUrl(html){
    if (html.includes('img')) {
        const rex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
        const coverMatch = rex.exec(html)
        return coverMatch ? coverMatch[1] : 'https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/Kapil+Gorve+www.jskap.com-site-cover.jpg';
      }
      return 'https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/Kapil+Gorve+www.jskap.com-site-cover.jpg';
}