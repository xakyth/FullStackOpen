import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../gqlQueries'

const Books = () => {
  const booksQuery = useQuery(ALL_BOOKS)

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
          {booksQuery.data.allBooks.map((a) => {
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
    </div>
  )
}

export default Books
