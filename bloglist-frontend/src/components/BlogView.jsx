import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'

const BlogView = () => {
    const [blog, setBlog] = useState(null)
    const { id } = useParams()
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const fetchBlog = await blogService.getBlogById(id)
                setBlog(fetchBlog)
                setComments(fetchBlog.comments || [])
            } catch (error) {
                console.error('Error fetching blog:', error)
            }
        }
        fetchBlog()
    }, [id])

    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }

    const handleAddComment = async (e) => {
        e.preventDefault()
        try {
          const newComment = comment
          const updatedComments = [...comments, newComment]
          await blogService.addComment(id, newComment)
          setComments(updatedComments)
          setComment('')
        } catch (error) {
          console.error('Error adding comment:', error)
        }
      }


    const handleLike = async (blog) => {
        try {
          const updatedLikes = blog.likes + 1
          const updatedBlog = await blogService.updateLikes(blog.id, updatedLikes)
          setBlog(updatedBlog) 
        } catch (error) {
          console.error('Error updating likes:', error)
        }
      }
    

    if (!blog) {
        return <p>Loading...</p>
    }

    return (
        <div>
        <h2>{blog.title}</h2>
        <p><strong>Author:</strong> {blog.author}</p>
        <p>{blog.url}</p>
        <p><strong>Likes:</strong> {blog.likes}</p>
        <button onClick={() => handleLike(blog)}>Like</button>
        <h3>Comments</h3>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ul>
        <form onSubmit={handleAddComment}>
        <div>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            required
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>
      </div>
    )
  }
  
  export default BlogView

