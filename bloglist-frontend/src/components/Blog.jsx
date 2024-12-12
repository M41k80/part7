import { useState } from "react"
import blogService from "../services/blogs"
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogs }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailStyle = {
    marginTop: 10,
    paddingLeft: 5,
    backgroundColor: '#e9e9e9',
    borderRadius: '5px',
    padding: '5px'
  }

  const handleToggleDetails = () => {
    setShowDetails(!showDetails)
  }

  
  const handleLikeclick = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const response = await blogService.update(blog.id, updatedBlog)
      setLikes(likes + 1)  
      updateBlogs()  
      console.log('Blog updated:', response)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  
  const handleDeleteBlog = async () => {
    try {
      await blogService.remove(blog.id)  
      updateBlogs()  
      console.log('Blog removed')
    } catch (error) {
      console.error('Error removing blog:', error)
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-header">
        <p className="blog-title">{blog.title} by </p>
        <p className="blog-author">{blog.author}</p>
        <button onClick={handleToggleDetails} className="view-details">
          {showDetails ? 'hide' : 'view'} details
        </button>
      </div>
      {showDetails && (
        <div style={detailStyle} className="blog-details">
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">Likes: {likes}</p>
          <button onClick={handleLikeclick} className="like-button">Like</button>

          <button onClick={handleDeleteBlog} className="delete-button">Delete</button> 
         
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired, 
  }).isRequired,
  updateBlogs: PropTypes.func.isRequired,
}

export default Blog
