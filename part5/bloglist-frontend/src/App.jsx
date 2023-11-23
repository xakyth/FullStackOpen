import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('trying to log in with', username, password)
    //TODO: implementation, add user to state
  }

  //TODO: if user === null => display login form, otherwise display blogs form
  return (
    <div>
      <Login
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
      />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App