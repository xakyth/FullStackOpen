import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const setNotification = useNotify()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },    
    onError: (error) => {
      const errorMessage = error.response.data.error
      setNotification(errorMessage)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    setNotification(`anecdote '${content}' added`)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
