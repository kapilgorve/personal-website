import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Giscus from '@giscus/react'

import Layout from '../components/layout'
import Content, { HTMLContent } from '../components/content'
import { extractCoverUrl } from '../utils/cover'
import SEO from '../components/seo'

class BlogPostTemplate extends Component {

  render() {
    const {
      content,
      contentComponent,
      date,
      title,
      helmet,
      id
    } = this.props;
    const PostContent = contentComponent || Content;
    return (
      <section className="blog">
        {helmet || ''}
        <div className="container-fluid article">
          <div className="row justify-content-md-center">
            <div className="col-md-8 col-lg-6">
              <h1 style={titleStyle}>
                {title}
              </h1>
              <p>{date}</p>
              <div className="mt-3">
                <PostContent content={content} />
                <Giscus
                  id="comments"
                  repo="kapilgorve/personal-website"
                  repoId="MDEwOlJlcG9zaXRvcnkxNDk3NDcyNjY="
                  category="Announcements"
                  categoryId="DIC_kwDOCOz2Qs4Cijdk"
                  mapping="pathname"
                  term="Welcome to @giscus/react component!"
                  reactionsEnabled="1"
                  emitMetadata="0"
                  inputPosition="top"
                  theme="noborder_light"
                  lang="en"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post, site: { siteMetadata: { ogurl } } } = data
  const { title, description, date, tags } = post.frontmatter;
  let coverUrl = extractCoverUrl(post.html);
  if (coverUrl === null) {
    coverUrl = `${ogurl}?&author=kapilgorve&title=${title}&tags=${tags.toString()}`
  }

  return (
    <Layout>
      <BlogPostTemplate
        id={post.id}
        title={post.frontmatter.title}
        content={post.html}
        contentComponent={HTMLContent}
        description={description}
        date={date}
        helmet={<SEO
          title={title}
          description={description}
          image={coverUrl}
          pathname={post.fields.slug}
          isArticle={true}
          date={date}
          tags={tags}
          keywords={tags.toString()}
        />}
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
    site {
      siteMetadata {
        defaultTitle
        ogurl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags,
        description
      }
      fields {
        slug
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