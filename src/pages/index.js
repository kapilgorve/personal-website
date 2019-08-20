import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import { Hero } from '../components/hero/hero'
import Contact from '../components/contact/contact'
import PortFolio from '../components/portfolio'
import Blog from '../components/blog';

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  let projects = edges.filter( p => p.node.frontmatter.type !== 'blog');
  let posts  = edges.filter( p => p.node.frontmatter.type === 'blog');
  return (
    <Layout>
      <Hero />
      <Blog posts={posts} />
      <PortFolio posts={projects} />
      <Contact />
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark
    (sort: { fields: [frontmatter___date], order: DESC })
    {
      totalCount
      edges {
        node {
          id
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

export default IndexPage
