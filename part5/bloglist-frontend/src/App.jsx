import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NOTIFICATION_TYPE from './constants/NotificationType'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const storedLogIn = loginService.getLoggedUser();
    if (storedLogIn) {
      setUser(storedLogIn)
      blogService.setToken(storedLogIn.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      loginService.setLoggedUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationHelper('wrong username or password', NOTIFICATION_TYPE.ERROR)
    }
  }

  const handleLogout = () => {
    loginService.clearLoggedUser()
  }

  const setNotificationHelper = (message, type, timeout) => {
    setNotification({
      type,
      message
    })
    setTimeout(() => {
      setNotification(null)
    }, timeout ? timeout : 5000)
  }

  const addBlog = async (blogObject) => {
    const response = await blogService.createBlog(blogObject)
    setNotificationHelper(`a new blog ${response.title} by ${response.author} added`, NOTIFICATION_TYPE.SUCCESS)
    refBlogForm.current.toggleVisibility()
  }

  const refBlogForm = useRef()

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification notification={notification} />
        <Login
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new note" ref={refBlogForm}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App