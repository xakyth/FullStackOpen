import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../gqlQueries'
import AuthorEdit from './AuthorEdit'

const Authors = ({ token }) => {
  const authorsQuery = useQuery(ALL_AUTHORS)

  if (authorsQuery.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authorsQuery.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {token && <AuthorEdit authors={authorsQuery.data.allAuthors} />}
    </div>
  )
}

export default Authors
