import { useDispatch, useSelector } from 'react-redux'
import { incVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state =>
    state
      .anecdotes
      .filter((a) => {
        return a.content.includes(state.filter)
      })
      .sort((a, b) => {
        if (a.votes > b.votes) return -1
        else return 1
      }))
  const voteHandler = (anecdote) => {
    dispatch(incVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }
  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voteHandler(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList