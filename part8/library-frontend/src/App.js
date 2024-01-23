import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-part8-user-token')
    setToken(token)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const paddingRight = {
    paddingRight: 10,
  }
  return (
    <div>
      <div>
        <Link style={paddingRight} to={'/'}>
          home
        </Link>
        <Link style={paddingRight} to={'/authors'}>
          authors
        </Link>
        <Link style={paddingRight} to={'/books'}>
          books
        </Link>
        <Link style={paddingRight} to={'/addBook'}>
          add book
        </Link>
        {!token ? (
          <Link style={paddingRight} to={'/login'}>
            login
          </Link>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Routes>
        <Route path='/' element={<p>Hello World!</p>} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<NewBook />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
