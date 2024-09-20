import React from 'react'
import PropTypes from 'prop-types'

import Contact from '../contact/contact';
import Header from '../header'
import './layout.css'
import SEO from '../seo';

const Layout = ({ children }) => (
  <>
    <SEO />
    <Header />
    <div>{children}</div>
    {/* <Join /> */}
    < Contact />
  </>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
