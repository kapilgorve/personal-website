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

const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
    }

    type Frontmatter {
      title: String!
      featuredImgUrl: String
    }
  `)
}


exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId }) => {
  // if (node.internal.type === `MarkdownRemark`) {
  //   if(node.frontmatter.featuredImgUrl) {
  //     console.log(node);
  //   }
  // }
  const { createNodeField, createNode } = actions
  if (node.internal.type === `MarkdownRemark`) {

    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    if (
      node.frontmatter
    ) {
      if (node.frontmatter.featuredImgUrl) {
        {

          let fileNode = await createRemoteFileNode({
            url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
            parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
            createNode, // helper function in gatsby-node to generate the node
            createNodeId, // helper function in gatsby-node to generate the node id
            cache, // Gatsby's cache
            store, // Gatsby's redux store
          })

          // if the file was created, attach the new node to the parent node
          if (fileNode) {
            node.featuredImg___NODE = fileNode.id
          }
        }
      }
    }

  }

}

exports.createPages = ({ actions, graphql }) => {
  // need createRedirect action in actions collection
  // to make the redirection magic happen.
  // https://www.gatsbyjs.org/docs/bound-action-creators/
  const { createRedirect, createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const portfolioPost = path.resolve(`./src/templates/portfolio-post.js`)
  const notePost = path.resolve(`./src/templates/note-post.js`)
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
    const blogPosts = result.data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.type === 'blog');

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

    const portfolioPosts = result.data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.type === 'portfolio');

    portfolioPosts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: portfolioPost,
        context: {
          slug: post.node.fields.slug,
        },
      })
    })

    const notePosts = result.data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.type === 'note');

    notePosts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: notePost,
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
