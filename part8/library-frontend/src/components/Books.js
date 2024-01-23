import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../gqlQueries'
import { useEffect, useState } from 'react'

const Books = () => {
  const [filter, setFilter] = useState(null)
  const [genres, setGenres] = useState(new Set())
  const booksQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (booksQuery.data) {
      let tempSet = new Set()
      booksQuery.data.allBooks.forEach((b) => {
        b.genres.forEach((g) => tempSet.add(g))
      })
      setGenres(tempSet)
    }
  }, [booksQuery.data])

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
          {booksQuery.data.allBooks
            .filter((b) => (filter ? b.genres.includes(filter) : true))
            .map((a) => {
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
