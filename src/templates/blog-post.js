import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Content, { HTMLContent } from '../components/content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  date,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="blog">
      {helmet || ''}
      <div className="container article">
      <div className="row justify-content-md-center">
        <div className="col-md-10 highlight">
          <h1 style={titleStyle}>
            {title}
          </h1>
          <p>{date}</p>
          <div className="mt-3">
            <PostContent content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta
              name="twitter:site"
              content={`@kapilgorve`}
            />
            <meta
              name="twitter:card"
              content={`summary`}
            />
            <meta
              name="twitter:title"
              content={`${post.frontmatter.title}`}
            />
            <meta
              name="twitter:description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        date={post.frontmatter.date}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags,
        description
      }
    }
  }
`

const titleStyle = {
  background: 'linear-gradient(to right, #cc2b5e, rgba(24, 0, 80, 0.89))',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginTop: '5rem',
  fontSize: '3em',
  textTransform: 'capitalize',
  wordBreak: 'break-word',
}