module.exports = {
  siteMetadata: {
    title: 'Kapil Gorve Freelance Web Developer',
    author: 'Kapil Gorve',
    description: 'Portfolio and blog by Kapil Gorve.',
    siteUrl: 'https://www.jskap.com',
    coverUrl: 'https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/Kapil+Gorve+www.jskap.com-site-cover.jpg',
    coverUrlHigh: 'https://kapilgorve.s3.ap-south-1.amazonaws.com/blog/covers/Kapil+Gorve+www.jskap.com-site-cover+high.jpg',
    social: {
      twitter: '@kapilgorve',
    },
    googleSiteVerification: 'wQ_f9X_15oprPRnRxUYGguIh0Hx7VaPbGECLUKMxgJI',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
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
        'gatsby-remark-autolink-headers',
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
  ],
}
