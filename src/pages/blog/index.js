import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../../components/layout'

const BlogIndex = ({ data }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <div className="container blog-index">
        <h1 className="mt-5 mb-5">Articles</h1>
        <div className="row mb-2">
          {edges.map(({node : post }) => {
              const {frontmatter} = post;
            return (
                <div key={post.id} className="col-md-6 mb-5">
                <div className="card" >
                    <Link to={`${post.fields.slug}`}>
                        <div className="card-body">
                          <h3 className="card-title" style={titleStyle}>
                            {frontmatter.title}
                          </h3>
                          <p className="mb-2">{frontmatter.date}</p>
                          <p className="mb-2">{post.excerpt}</p>
                          {frontmatter.tags.map(tag => {
                            return (
                              <div className="chip" key={tag}>
                                {tag}
                              </div>
                            )
                          })}
                        </div>
                    </Link>
                  </div>
                </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

const titleStyle = {
    background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }

export const query = graphql`
  query BlogQuery {
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

export default BlogIndex
