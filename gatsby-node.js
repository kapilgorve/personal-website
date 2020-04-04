/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.

const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}

exports.createPages = ({ actions, graphql }) => {
  // need createRedirect action in actions collection
  // to make the redirection magic happen.
  // https://www.gatsbyjs.org/docs/bound-action-creators/
  const { createRedirect, createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const portfolioPost = path.resolve(`./src/templates/portfolio-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                type
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const blogPosts = result.data.allMarkdownRemark.edges.filter( ({node}) => node.frontmatter.type === 'blog' );

    blogPosts.forEach((post, index) => {
      const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
      const next = index === 0 ? null : blogPosts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    const portfolioPosts = result.data.allMarkdownRemark.edges.filter( ({node}) => node.frontmatter.type === 'portfolio' );

    portfolioPosts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: portfolioPost,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })

    return null
  });


  // let redirectBatch = [
  //   {
  //     f: `/vlog`,
  //     t: `https://www.youtube.com/channel/UCAseX9IBXkoSZdxMX_41jag`,
  //   },
  // ]

  // redirectBatch.forEach(({ f, t }) => {
  //   if (t === ``) {
  //     t = '/'
  //   }
  //   createRedirect({
  //     fromPath: f,
  //     redirectInBrowser: true,
  //     toPath: t,
  //   })
  //   // Uncomment next line to see forEach in action during build
  //   // console.log('\nRedirecting:\n' + f + '\nTo:\n' + t + '\n');
  // })
}
