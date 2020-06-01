import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function Nav () {
  const navStyle = {
    textDecoration: 'none',
    cursor: 'pointer'
  }
  return (
    <div className='home-left-sidebar'>
      <nav>
        <ul>
          <Link to='/boards' style={navStyle}>
            <li>Boards</li>
          </Link>
          <Link to='/templates' style={navStyle}>
            <li>Templates</li>
          </Link>
          <Link to='/' style={navStyle}>
            <li>Home</li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
