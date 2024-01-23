import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../gqlQueries'
import { useEffect, useState } from 'react'

const Recommendations = () => {
  const [user, setUser] = useState(null)
  const userQuery = useQuery(CURRENT_USER)
  const booksQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    userQuery.refetch()
  }, [])

  useEffect(() => {
    if (userQuery.data) {
      setUser(userQuery.data.me)
    }
  }, [userQuery])

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
          {booksQuery.data.allBooks
            .filter((b) => {
              return user.favoriteGenre
                ? b.genres.includes(user.favoriteGenre)
                : true
            })
            .map((b) => {
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
