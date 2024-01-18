import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../gqlQueries'

const AuthorEdit = ({ authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const onSubmit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        author: name,
        setBornTo: Number(year),
      },
      refetchQueries: [ALL_AUTHORS],
    })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={onSubmit}>
        <div>
          name:{' '}
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          year:{' '}
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorEdit
