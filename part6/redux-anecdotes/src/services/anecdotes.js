import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const incVote = async (id) => {
  let response = await axios.get(`${baseUrl}/${id}`)
  const updatedNote = { ...response.data, votes: response.data.votes + 1 }
  response = await axios.put(`${baseUrl}/${id}`, updatedNote)
  return response.data
}

export default { getAll, createNew, incVote }
