import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NOTIFICATION_TYPE from './constants/NotificationType'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from './reducers/blogsReducer'
import { initUserFromStorage, logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUserFromStorage())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
  }

  const addLike = async (blog) => {
    dispatch(updateBlog(blog))
  }

  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject)).then((blog) => {
      if (blog)
        dispatch(
          setNotification({
            message: `a new blog ${blog.title} by ${blog.author} added`,
            type: NOTIFICATION_TYPE.SUCCESS,
          })
        )
    })
    refBlogForm.current.toggleVisibility()
  }

  const removeBlog = async (blog) => {
    dispatch(deleteBlog(blog))
  }

  const refBlogForm = useRef()

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new note' ref={refBlogForm}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={addLike}
          user={user}
          handleRemove={removeBlog}
        />
      ))}
    </div>
  )
}

export default App
