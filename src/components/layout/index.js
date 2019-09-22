import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'
import './layout.css'
// import Chat from '../chat'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
            description
            siteUrl
            coverUrl
            coverUrlHigh
            googleSiteVerification
            social {
              twitter
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'author', content: data.site.siteMetadata.author},
            {
              name: 'keywords',
              content:
                'ReactJs Freelancer, Frontend Freelancer, Freelance WebDeveloper',
            },
            {
              name: 'google-site-verification',
              content: data.site.siteMetadata.googleSiteVerification,
            },
          // OpenGraph/Facebook tags
          {
            name: 'og:title',
            content: data.site.siteMetadata.title,
          },
          {
            name: 'og:descriptiom',
            content: data.site.siteMetadata.description,
          },
          {
            name: 'og:image',
            content: data.site.siteMetadata.coverUrl,
          },
          {
            name: 'og:url',
            content: data.site.siteMetadata.siteUrl,
          },
          {
            name: 'og:site_name',
            content: data.site.siteMetadata.title,
          },
          // Twitter meta tags
          {
            name: 'twitter:title',
            content: data.site.siteMetadata.title,
          },
            {
              name: 'twitter:description',
              content: data.site.siteMetadata.description,
            },
            {
              name: 'twitter:site',
              content: data.site.siteMetadata.social.twitter,
            },
            {
              name: 'twitter:creator',
              content: data.site.siteMetadata.social.twitter,
            },
            {
              name: 'twitter:image',
              content: data.site.siteMetadata.coverUrl,
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Header />
        <div>{children}</div>
        {/* <Chat /> */}
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
