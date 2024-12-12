import axios from 'axios'

// URL base
const baseUrl = 'http://localhost:3000/api/blogs'


const getAllBlogs = async () => {
  try {
    const response = await axios.get(baseUrl)
    console.log('Blogs:', response.data)
    return response.data
  } catch (error) {
    console.error('Error getting blogs:', error.response ? error.response.data : error)
    throw error  
  }
}


const createBlog = async (newBlog) => {
  try {
    const response = await axios.post(baseUrl, newBlog)
    console.log('Blog created:', response.data)
    return response.data  
  } catch (error) {
    console.error('Error creating blog:', error.response ? error.response.data : error)
    throw error  
  }
}

const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`)
    console.log('Blog:', response.data)
    return response.data  
  } catch (error) {
    console.error('Error getting blog:', error.response? error.response.data : error)
    throw error  
  }
}


const updateBlog = async (id, updatedBlog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
    console.log('Blog updated:', response.data)
    return response.data  
  } catch (error) {
    console.error('Error updating blog:', error.response ? error.response.data : error)
    throw error  
  }
}


const removeBlog = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`)
    console.log('Blog removed:', response.data)
    return response.data  
  } catch (error) {
    console.error('Error removing blog:', error.response ? error.response.data : error)
    throw error  
  }
}

const login = async ({username, password}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      username,
      password,
    })
    return response.data 
  } catch (error) {
    console.error('Error en el login:', error.response ? error.response.data : error)
    throw error
  }
}

const updateLikes = async (blogId, updatedLikes) => {
  try {
    const response = await axios.put(`http://localhost:3000/api/blogs/${blogId}`, {
      likes: updatedLikes
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar los likes:', error);
    throw error;
  }
}


const addComment = async (id, comment) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/blogs/${id}/comments`, {
      comment
    })
    return response.data
  } catch (error) {
    console.error('Error al agregar el comentario:', error)
    throw error
  }
}

export default { login, getAllBlogs, createBlog, updateBlog, removeBlog, updateLikes, getBlogById, addComment }


