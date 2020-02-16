import React from 'react'
import { Helmet } from 'react-helmet';
import Layout from '../../components/layout'
import PortFolio from '../../components/portfolio';


const PortfolioPage = ({ data }) => {
    const { edges } = data.allMarkdownRemark;
    return (
      <Layout>
         <Helmet>
         <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <PortFolio posts={edges} />
      </Layout>
    )
  }

export default PortfolioPage


export const query = graphql`
  query PortFolioQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "portfolio" } } },
    sort: { fields: [frontmatter___date], order: DESC }) {
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