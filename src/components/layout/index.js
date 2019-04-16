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
              content:
                'Pune based freelancer working on ReactJs, Angular,NodeJs.',
            },
            { name: 'author', content: 'Kapil Gorve' },
            {
              name: 'keywords',
              content:
                'ReactJs Freelancer, Frontend Freelancer, Angular Freelancer, Freelance WebDeveloper',
            },
            {
              name: 'google-site-verification',
              content:
                'wQ_f9X_15oprPRnRxUYGguIh0Hx7VaPbGECLUKMxgJI',
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
