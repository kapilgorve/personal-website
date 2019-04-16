import React from 'react'
import { graphql} from 'gatsby'
import { UncontrolledCarousel } from 'reactstrap'
import Layout from '../../components/layout'

const details = ({ data }) => {
  if (typeof window === 'undefined') {
    return null
  }
  const { edges: posts } = data.allMarkdownRemark
  const url = new window.URL(window.location.href)
  const id = url.searchParams.get('id')

  let post, content
  posts.map(({ node }) => {
    if (node.id === id) {
      post = node.frontmatter
      content = node.html
    };
    return node;
  })
  const images = post.screens.map(s => {
    return {
      src: s,
      caption: '',
    }
  })

  return (
    <Layout>
      <div className="details">
        <div>
          <UncontrolledCarousel items={images} />
          <div className="container">
            <div className="col-md-10 article">
              <h2 className="title">{post.title}</h2>
              <div className="tags">
                {post.tags.map(t => {
                  return (
                    <div className="chip" key={t}>
                      {t}
                    </div>
                  )
                })}
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query DetailQuery {
    allMarkdownRemark(filter: {frontmatter:{type: {eq : "portfolio"}}}) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            path
            tags
            screens
          }
        }
      }
    }
  }
`
export default details
