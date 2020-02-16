import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Hero } from '../components/hero/hero'
import Contact from '../components/contact/contact'
import Blog from '../components/blog';
import YoutubeList from '../components/youtubeList'


const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  if (typeof window === 'undefined') {
    return null
  }
    window.omnisend = window.omnisend || [];
    omnisend.push(["accountID", "5e48d82d4c7fa47e7cb56127"]);
    omnisend.push(["track", "$pageViewed"]);
    !function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://omnisrc.com/inshop/launcher-v2.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}();

  return (
    <Layout>
      <Hero />
      <Blog posts={edges} />
      <YoutubeList />
      <Contact />
    </Layout>
  )
}

export const query = graphql`
query IndexQuery {
  allMarkdownRemark(filter: { frontmatter: { type: { eq: "blog" } } },
  sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        id
        excerpt(pruneLength: 240)
        frontmatter {
          title
          tags
          date
        }
        fields {
          slug
        }
      }
    }
  }
}
`

export default IndexPage
