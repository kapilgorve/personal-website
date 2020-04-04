import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet';
import { UncontrolledCarousel } from 'reactstrap'
import Layout from '../components/layout'

const PortfolioPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const { frontmatter: { title, tags, screens }, html } = post;
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


export const pageQuery = graphql`
  query PortfolioPostByID($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        path
        tags
        screens
      }
      fields {
        slug
      }
    }
  }
`
export default PortfolioPost
