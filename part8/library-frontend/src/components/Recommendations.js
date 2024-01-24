import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../gqlQueries'
import { useEffect, useState } from 'react'

const Recommendations = () => {
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])
  const userQuery = useQuery(CURRENT_USER)
  const [getBooks, booksQuery] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    userQuery.refetch()
  }, [])

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data.me)
    }
  }, [userQuery.data])

  useEffect(() => {
    if (user) {
      getBooks({ variables: { genre: user.favoriteGenre } })
    }
  }, [user])

  useEffect(() => {
    if (booksQuery.data) {
      setBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery.data])

  if (!user || !booksQuery.data) return null
  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre <strong>{user.favoriteGenre}</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => {
            return (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
