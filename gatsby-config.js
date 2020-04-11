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
                author
                defaultTitle
                defaultDescription
                siteUrl
                site_url: siteUrl
              }
            }
            allMarkdownRemark {
              edges {
                node {
                  rawMarkdownBody
                  frontmatter {
                    date
                    description
                    path
                    tags
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                // console.log(edge.node.rawMarkdownBody);
                const tags = edge.node.frontmatter.tags.map(tag => ({ "tag": tag }));
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [
                    { 'markdown': edge.node.rawMarkdownBody },
                    { "content:encoded": edge.node.html },
                    { 'footer': `\nThis post was originally published at ${site.siteMetadata.siteUrl + edge.node.fields.slug}.` },
                    ...tags],
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
                      excerpt
                      html
                      fields { slug }
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
