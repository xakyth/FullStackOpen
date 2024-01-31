import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED } from './gqlQueries'

const App = () => {
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded
      window.alert(`${book.title} by ${book.author.name} added!`)
      client.refetchQueries({
        include: ['allBooks'],
      })
    },
  })

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
        {token && (
          <>
            <Link style={paddingRight} to={'/addBook'}>
              add book
            </Link>
            <Link style={paddingRight} to={'/recommendations'}>
              recommend
            </Link>
          </>
        )}
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
        <Route path='/authors' element={<Authors token={token} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<NewBook token={token} />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/recommendations' element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
