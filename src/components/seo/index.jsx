import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({
  title = null,
  description = null,
  image = null,
  pathname = null,
  isArticle = false,
  titleTemplate = null,
  keywords = null,
  tags = null,
  date = null,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
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
  )

  const {
    defaultTitle,
    author,
    defaultDescription,
    siteUrl,
    defaultImage,
    googleSiteVerification,
    defaultKeywords,
    social: { twitter },
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
    titleTemplate: titleTemplate || `%s - ${siteUrl}`,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname || ''}`,
    keywords: keywords || defaultKeywords,
    twitter: twitter,
  }

  return (
    <Helmet title={seo.title} titleTemplate={seo.titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="google-site-verification" content={googleSiteVerification} />
      <link rel="canonical" href={seo.url} />

      {/* Twitter meta tags */}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:site" content={seo.twitter} />
      <meta name="twitter:creator" content={seo.twitter} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* OpenGraph/Facebook tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="og:site_name" content={defaultTitle} />
      <meta property="og:url" content={seo.url} />
      {isArticle && <meta property="og:type" content="article" />}

      {/* non important */}
      <html lang="en" />
      <meta name="author" content={author} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="content" content={seo.description} />
      {tags && <meta name="tags" content={tags} />}
      {date && <meta name="date" content={date} />}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string,
  isArticle: PropTypes.bool,
  titleTemplate: PropTypes.string,
  keywords: PropTypes.string,
  tags: PropTypes.string,
  date: PropTypes.string,
}

export default SEO
