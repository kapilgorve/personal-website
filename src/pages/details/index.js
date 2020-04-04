import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet';
import { UncontrolledCarousel } from 'reactstrap'
import Layout from '../../components/layout'

const details = ({ data }) => {
  if (typeof window === 'undefined') {
    return null
  }
  const { edges: posts } = data.allMarkdownRemark
  const url = new window.URL(window.location.href)
  const id = url.searchParams.get('id')

  let post = posts.find(post => post.node.id === id);
  console.log(post);
  const { node: { frontmatter: { title, tags, screens }, html } } = post;
  const images = screens.map(s => {
    return {
      src: s,
      caption: '',
    }
  })

  return (
    <Layout>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="details">
        <div>
          {images.length > 0 && <UncontrolledCarousel items={images} />}
          <div className="container">
            <div className="col-md-10 article">
              <h2 className="title">{title}</h2>
              <div className="tags">
                {tags.map(t => {
                  return (
                    <div className="chip" key={t}>
                      {t}
                    </div>
                  )
                })}
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: html }}
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
