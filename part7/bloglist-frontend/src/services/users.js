import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`http://localhost:3001/api/users/${id}`)
  return response.data
}

export default { getAll, getById }
