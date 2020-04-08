import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
const SEO = ({
  title,
  description,
  image,
  pathname,
  isArticle,
  titleTemplate,
  keywords,
  tags,
  date,
}) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          author,
          defaultDescription,
          siteUrl,
          defaultImage,
          googleSiteVerification,
          social: { twitter },
          defaultKeywords,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        titleTemplate: `%s - ${siteUrl}`,
        description: description || defaultDescription,
        image: image || defaultImage,
        url: `${siteUrl}${pathname ? pathname : ''}`,
        keywords: keywords || defaultKeywords,
      }
      return (
        <>
          <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            <meta name="google-site-verification" content={googleSiteVerification} />
            <link rel="canonical" href={seo.url} />

            {/* Twitter meta tags */}
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:site" content={twitter} />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:card" content="summary_large_image" />

            {/* OpenGraph/Facebook tags */}
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta name="og:site_name" content={seo.defaultTitle} />
            <meta property="og:url" content={seo.url} />
            {(isArticle ? true : null) && (
              <meta property="og:type" content="article" />
            )}


            {/* non important */}
            <html lang="en" />
            <meta name="author" content={author} />
            <meta name="kyewords" content={seo.keywords} />
            {tags && <meta name="tags" content={tags} />}
            {date && <meta name="date" content={date} />}
          </Helmet>
        </>
      )
    }}
  />
)
export default SEO
SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  article: PropTypes.bool,
}
SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  pathname: null,
  article: false,
  titleTemplate: null,
  tags: null,
  date: null,
}
const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle
        author
        defaultDescription
        siteUrl
        defaultImage
        googleSiteVerification
        defaultKeywords
        social {
          twitter
        }
      }
    }
  }
`
