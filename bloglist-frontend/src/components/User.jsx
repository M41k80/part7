import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${id}`)
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [id])

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.username}</p>
      <h3>Blogs created by {user.username}</h3>
      <ul>
        {user.blogs.length === 0 ? (
          <p>No blogs created yet.</p>
        ) : (
          user.blogs.map(blog => (
            <li key={blog.id}>
              <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.title}</a>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default User
