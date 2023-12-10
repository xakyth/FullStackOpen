import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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