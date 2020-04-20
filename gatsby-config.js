module.exports = {
  siteMetadata: {
    defaultTitle: 'Kapil Gorve',
    author: 'Kapil Gorve',
    defaultDescription: 'Freelance Frontend Developer | ReactJs,NodeJs,ReactNative.',
    siteUrl: 'https://www.jskap.com/',
    defaultImage: 'https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/Kapil+Gorve+www.jskap.com-site-cover.jpg',
    social: {
      twitter: '@kapilgorve',
    },
    googleSiteVerification: 'wQ_f9X_15oprPRnRxUYGguIh0Hx7VaPbGECLUKMxgJI',
    defaultKeywords: 'ReactJs,NodeJs,React Native,GatsbyJs',
    ogurl: 'https://friendly-heyrovsky-86d9f9.netlify.app/opengraph'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: [`/portfolio/*`, '/portfolio/'],
      }
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Kapil Gorve Blog',
        short_name: 'Blog',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: null,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2000,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-145836960-1",
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `kapilgorve`
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.jskap.com/',
        sitemap: 'https://www.jskap.com/sitemap.xml',
        policy: [{ userAgent: '*', disallow: '/portfolio/', disallow: '/portfolio/*' }]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
              ogurl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              const {siteMetadata: {siteUrl, ogurl}} = site;

              function extractCoverUrl(html){
                if (html.includes('img')) {
                    const rex = /<img[^>]+src="(https:\/\/[^">]+)"/g;
                    const coverMatch = rex.exec(html)
                    return coverMatch ? coverMatch[1] : null;
                  }
                  return null;
            }
              return allMarkdownRemark.edges.map(edge => {

                const {node: {frontmatter, fields}} = edge;
                const categories = frontmatter.tags.map( tag => ({category: tag}));
                let cover_url, ogCoverImage;
                if(extractCoverUrl(node.html) === null){
                  cover_url = `${ogurl}?&author=kapilgorve&title=${title}&tags=${tags.toString()}`
                  ogCoverImage = `<img src="${cover_url}" alt="'cover'">`
                }

                const footer = `<br><p>This post was originally published at ${siteUrl + fields.slug}</p>
                <br><p>👋 Hi! I’m Kapil. I am always chatty about building things, sharing my learnings, freelancing.
                 Come say hi to me at <a target="_blank"  href="https://twitter.com/kapilgorve">https://twitter.com/kapilgorve</a></p>`
                return Object.assign({},frontmatter, {
                  date: frontmatter.date,
                  url: siteUrl + fields.slug,
                  guid: siteUrl + fields.slug,
                  custom_elements: [
                    ...categories,
                    { markdown: ogCoverImage + edge.node.rawMarkdownBody },
                    { mediumtags: frontmatter.tags.join(',')},
                    { 'content:encoded': ogCoverImage+ node.html + footer },
                    { footer: footer },
                    {'cover_url': cover_url}, //for dev.to
                    { description: frontmatter.description},
                    // keep description last for devto priority after content
                  ],
                })
              })
            },
            query: `
        {
          allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
            filter: {frontmatter: {type: {nin: "portfolio"}}},
          ) {
            edges {
              node {
                fields { slug }
                rawMarkdownBody
                html
                frontmatter {
                  title
                  date
                  description
                  tags
                }
              }
            }
          }
        }
      `,
            output: "/rss.xml",
            title: "Kapil Gorve's Blog RSS Feed",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/",
            // optional configuration to specify external rss feed, such as feedburner
            // link: "https://feeds.feedburner.com/gatsby/blog",
          },
        ],
      },
    },
  ],
}
