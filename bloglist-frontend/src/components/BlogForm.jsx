
import React, { useState } from 'react'

const BlogForm = ({ createBlog, showNotification }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,  
    }

    try {
      await createBlog(newBlog)  
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (exception) {
      showNotification('Error al agregar el blog', 'error')  
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar un nuevo blog</h2>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          name="title"
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input
          id="author"
          name="author"
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          name="url"
          type="url"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          required
        />
      </div>
      <button type="submit">Crear</button>
    </form>
  )
}

export default BlogForm
