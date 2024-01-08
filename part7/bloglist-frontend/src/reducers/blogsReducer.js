import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    sortBlogs(state) {
      return state.sort((b1, b2) => {
        if (b1.likes > b2.likes) return -1
        else if (b1.likes < b2.likes) return 1
        else return 0
      })
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const id = action.payload.id
      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const initBlogs = () => {
  return async (dispatch) => {
    const initBlogs = await blogService.getAll()
    dispatch(blogsSlice.actions.setBlogs(initBlogs))
    dispatch(blogsSlice.actions.sortBlogs())
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)
    dispatch(blogsSlice.actions.addBlog(newBlog))
    dispatch(blogsSlice.actions.sortBlogs())
    return newBlog
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.updateBlog(blog)
    dispatch(blogsSlice.actions.updateBlog(blog))
    dispatch(blogsSlice.actions.sortBlogs())
    return updatedBlog
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.removeBlog(blog)
    dispatch(blogsSlice.actions.removeBlog(blog.id))
  }
}

export default blogsSlice.reducer
