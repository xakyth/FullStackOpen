import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
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
      </div>

      <Routes>
        <Route path='/' element={<p>Hello World!</p>} />
        <Route path='/authors' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/addBook' element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
