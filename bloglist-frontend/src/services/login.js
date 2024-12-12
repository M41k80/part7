
import axios from 'axios'

const baseUrl = 'http://localhost:3000/api/login'

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials, {
      headers: {
        'Content-Type': 'application/json',  
      }
    })
    return response.data
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error)
    throw error
  }
}

export default { login }
