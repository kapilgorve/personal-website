import React from 'react'
import { Link } from 'gatsby'
import './header.css'

const Header = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-brand">
      Home
    </Link>
    <Link to="/blog/" className="navbar-brand">
      Blog
    </Link>
    <Link to="/notes/" className="navbar-brand">
      Notes
    </Link>
  </nav>
)

export default Header
