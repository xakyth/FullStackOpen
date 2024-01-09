import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let headers = null

const setToken = (newToken) => {
  token = newToken
  headers = {
    headers: { Authorization: `Bearer ${token}` },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, headers)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, headers)
  return response.data
}

const createBlog = async (blog) => {
  const response = await axios.post(baseUrl, blog, headers)
  return response.data
}

const updateBlog = async (blogObject) => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    headers
  )
  return response.data
}

const removeBlog = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`, headers)
}

const addComment = async (id, comment) => {
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    headers
  )
  return response.data
}

export default {
  getAll,
  getById,
  createBlog,
  setToken,
  updateBlog,
  removeBlog,
  addComment,
}
