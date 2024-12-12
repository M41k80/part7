import React from 'react'
import { Link } from 'react-router-dom'
import '../Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex' }}>
        <li style={{ marginRight: '15px' }}>
          <Link to="/">Home</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
          <Link to="/blogs">Blogs</Link>
        </li>
        <li style={{ marginRight: '15px' }}>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar