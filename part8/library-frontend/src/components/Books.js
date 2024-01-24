import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../gqlQueries'
import { useEffect, useState } from 'react'

const Books = () => {
  const [filter, setFilter] = useState(null)
  const [genres, setGenres] = useState(new Set())
  const [books, setBooks] = useState([])
  const booksQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (booksQuery.data) {
      let tempGenres = new Set(genres)
      booksQuery.data.allBooks.map((b) => {
        tempGenres = new Set([...tempGenres, ...b.genres])
      })
      setGenres(tempGenres)
      setBooks(booksQuery.data.allBooks)
    }
  }, [booksQuery.data])

  useEffect(() => {
    booksQuery.refetch({ genre: filter })
  }, [filter])

  if (booksQuery.loading) return <div>loading...</div>

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        {Array.from(genres).map((g) => (
          <button onClick={() => setFilter(g)} key={g}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
