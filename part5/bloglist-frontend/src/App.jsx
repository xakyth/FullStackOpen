import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.Username.value
    const password = event.target.Password.value
    console.log('trying to log in with', username, password)
    //TODO: implementation, add user to state
  }

  //TODO: if user === null => display login form, otherwise display blogs form
  return (
    <div>
      <Login handleLogin={handleLogin} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App