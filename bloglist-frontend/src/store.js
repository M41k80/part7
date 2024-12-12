import { createStore, combineReducers } from 'redux'


const initialBlogsState = []


const SET_BLOGS = 'SET_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const REMOVE_BLOG = 'REMOVE_BLOG'


const blogsReducer = (state = initialBlogsState, action) => {
  switch (action.type) {
    case SET_BLOGS:
      return action.data
    case ADD_BLOG:
      return [...state, action.data]
    case LIKE_BLOG:
      
      return state.map(blog =>
        blog.id === action.data.id
          ? { ...blog, likes: action.data.likes } 
          : blog
      )
    case REMOVE_BLOG:
      return state.filter(blog => blog.id !== action.data)
    default:
      return state
  }
}

const initialNotificationState = {
  message: '',
  type: ''
}


const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'


const notificationReducer = (state = initialNotificationState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type
      }
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        message: '',
        type: ''
      }
    default:
      return state
  }
}


const rootReducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})


const store = createStore(rootReducer)

export default store


export const setBlogs = (blogs) => ({
  type: SET_BLOGS,
  data: blogs
})

export const addBlog = (blog) => ({
  type: ADD_BLOG,
  data: blog
})


export const likeBlog = (blog) => ({
  type: LIKE_BLOG,
  data: blog
})

export const removeBlog = (id) => ({
  type: REMOVE_BLOG,
  data: id
})


export const setNotification = (message, type) => ({
  type: SET_NOTIFICATION,
  payload: { message, type }
})

export const clearNotification = () => ({
  type: CLEAR_NOTIFICATION
})
