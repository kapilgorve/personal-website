import React from 'react'
import { Link } from 'gatsby'
import './header.css'

const Header = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-brand">
      Home
    </Link>
  </nav>
)

export default Header
