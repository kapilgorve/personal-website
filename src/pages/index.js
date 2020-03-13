import React, { Suspense } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import { Hero } from '../components/hero/hero'
import Blog from '../components/blog';

const YoutubeList = React.lazy(() => import('../components/youtubeList'));


const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Hero />
      <Blog posts={edges} />
      <Suspense fallback={<div>Loading Youtube videos...</div>}>
        <YoutubeList />
      </Suspense>
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
