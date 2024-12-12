import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import blogService from './services/blogs'
import { addBlog, removeBlog, likeBlog, setBlogs, setNotification, clearNotification } from './store'
import UserList from './components/UserList'
import BlogForm from './components/BlogForm'
import Notificacion from './components/Notificacion'
import User from './components/User'
import BlogView from './components/BlogView'
import Navbar from './components/Navbar'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAllBlogs()
        dispatch(setBlogs(blogs))
      } catch (error) {
        dispatch(setNotification('Error loading blogs', 'error'))
        setTimeout(() => dispatch(clearNotification()), 5000)
      }
    }
    fetchBlogs()
  }, [dispatch])

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.createBlog(newBlog)
      dispatch(addBlog(blog))
      dispatch(setNotification(`Blog "${newBlog.title}" added successfully`, 'success'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    } catch (error) {
      dispatch(setNotification('Error creating blog', 'error'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await blogService.login({ username, password })
      setUser(user)
      dispatch(setNotification('User logged in successfully', 'success'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    } catch (error) {
      dispatch(setNotification('Error, incorrect credentials', 'error'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    dispatch(setNotification('Logged out successfully', 'success'))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const handleRemove = async (id) => {
    try {
      await blogService.removeBlog(id)
      dispatch(removeBlog(id))
      dispatch(setNotification('Blog deleted successfully', 'success'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    } catch (error) {
      console.error('Error deleting blog', error)
      dispatch(setNotification('Error deleting blog', 'error'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  const handleLike = async (blog) => {
    const updatedLikes = blog.likes + 1
    try {
      const updatedBlog = await blogService.updateLikes(blog.id, updatedLikes)
      dispatch(likeBlog(updatedBlog))
      dispatch(setNotification(`Liked "${updatedBlog.title}"`, 'success'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    } catch (error) {
      console.error('Error updating like', error)
      dispatch(setNotification('Error liking the blog', 'error'))
      setTimeout(() => dispatch(clearNotification()), 5000)
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-semibold text-center text-teal-400 mb-6">Blogs</h1>
          <Notificacion />

          {!user ? (
            <div className="max-w-md mx-auto p-6 bg-gray-800 shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold text-blue-500 mb-4">Login</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const username = e.target.username.value
                  const password = e.target.password.value
                  handleLogin(username, password)
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium">Username:</label>
                  <input
                    type="text"
                    name="username"
                    required
                    className="mt-1 p-2 border border-gray-700 rounded w-full bg-gray-700 text-white"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Password:</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="mt-1 p-2 border border-gray-700 rounded w-full bg-gray-700 text-white"
                  />
                </div>
                <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded w-full hover:bg-teal-600">
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-center text-lg text-teal-300">Welcome, {user.username}</p>
              <div className="text-center">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>

              <BlogForm createBlog={createBlog} />

              <h2 className="text-xl font-semibold mt-4 text-teal-400">Blogs List</h2>
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <div key={blog.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition">
                    <h3 className="text-lg font-semibold text-teal-300">
                      <Link to={`/blogs/${blog.id}`} className="text-teal-500 hover:underline">
                        {blog.title}
                      </Link> by {blog.author}
                    </h3>
                    <p className="text-sm text-gray-400">Likes: {blog.likes}</p>
                    <button
                      onClick={() => handleLike(blog)}
                      className="mt-2 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
                    >
                      Like
                    </button>
                    <button
                      onClick={() => handleRemove(blog.id)}
                      className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  to="/users"
                  className="text-teal-500 hover:underline"
                >
                  View Users
                </Link>
              </div>
            </div>
          )}
        </div>

        <Routes>
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
