import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { update } from "../requests"
import axios from "axios"
import { useNotify } from "../NotificationContext"

const AnecdoteList = () => {
  const setNotification = useNotify()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`anecdote '${content}' voted`)
    }
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: false
  })
  if (isLoading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = data;

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
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList