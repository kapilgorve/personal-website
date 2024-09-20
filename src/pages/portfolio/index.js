import React from 'react'
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import Layout from '../../components/layout'
import PortFolio from '../../components/portfolio';


const PortfolioPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout>
      <Helmet>
        <meta name="title" content="Kapil Gorve Freelance Portfolio" />
      </Helmet>
      <PortFolio posts={edges} />
    </Layout>
  )
}

export default PortfolioPage


export const query = graphql`
  query PortFolioQuery {
  allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "portfolio"}}}
    sort: {frontmatter: {date: DESC}}
  ) {
    totalCount
    edges {
      node {
        id
        excerpt(pruneLength: 240)
        frontmatter {
          title
          path
          tags
          type
          thumb
        }
        fields {
          slug
        }
      }
    }
  }
}
`