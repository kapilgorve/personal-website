import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Content, { HTMLContent } from '../components/content'
import { extractCoverUrl } from '../utils/cover'

export class NotePostTemplate extends Component {
  state = {
    DisqusWrap: null,
    CommentCountWrap: null,
  };

  componentDidMount() {
    import('../components/disquswrap/Disqus')
      .then(component => this.setState({ DisqusWrap: component.default }));

    import('../components/disquswrap/CommentCount')
      .then(component => this.setState({ CommentCountWrap: component.default }));
  }

  render() {
    const {
      content,
      contentComponent,
      date,
      title,
      helmet,
      id
    } = this.props;
    const { DisqusWrap, CommentCountWrap } = this.state;
    const PostContent = contentComponent || Content;
    let disqusConfig = { identifier: id, title };
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
              {CommentCountWrap && <CommentCountWrap config={disqusConfig} placeholder={''} />}
              <div className="mt-3">
                <PostContent content={content} />
                {DisqusWrap && <DisqusWrap config={disqusConfig} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

NotePostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const NotePost = ({data}) => {
    // console.log(props);
  const { markdownRemark: post } = data
  const coverUrl = extractCoverUrl(post.html);
  const keywords = post.frontmatter.tags.toString();

  return (
    <Layout>
      <NotePostTemplate
        id={post.id}
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
              name="keywords"
              content={`${keywords}`}
            />
            {/* OpenGraph/Facebook tags */}
            <meta
              name="og:title"
              content={`${post.frontmatter.title}`}
            />
            <meta
              name="og:description"
              content={`${post.frontmatter.description}`}
            />
            <meta
              name="og:image"
              content={`${coverUrl}`}
            />
            <meta
              name="og:url"
              content={`${data.site.siteMetadata.siteUrl}${post.fields.slug}`}
            />
            <meta
              name="og:site_name"
              content={`${data.site.siteMetadata.title}`}
            />
            <meta
              name="og:type"
              content={`article`}
            />
            {/* Twitter tags */}
            <meta
              name="twitter:site"
              content={`${data.site.siteMetadata.social.twitter}`}
            />
            <meta
              name="twitter:creator"
              content={`${data.site.siteMetadata.social.twitter}`}
            />
            <meta
              name="twitter:title"
              content={`${post.frontmatter.title}`}
            />
            <meta
              name="twitter:description"
              content={`${post.frontmatter.description}`}
            />
            <meta
              name="twitter:card"
              content={`summary_large_image`}
            />
            <meta
              name="twitter:image"
              content={`${coverUrl}`}
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

NotePost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default NotePost

export const pageQuery = graphql`
  query NotePostByID($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        social {
          twitter
        }
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