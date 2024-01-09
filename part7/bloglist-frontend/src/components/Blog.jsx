import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const [blog, setBlog] = useState(null)
  const user = useSelector((state) => state.user)
  const { id } = useParams()
  useEffect(() => {
    blogService.getById(id).then((b) => setBlog(b))
  }, [id])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLikeButton = (event) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(updateBlog(updatedBlog))
    setBlog(updatedBlog)
  }

  const handleRemoveBlogButton = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const removeBlogButton = () => {
    if (user.username === blog.user.username) {
      return (
        <div>
          <button onClick={handleRemoveBlogButton}>remove</button>
        </div>
      )
    }
  }

  if (!blog) return null
  return (
    <div>
      <h1>{`${blog.title} ${blog.author}`}</h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes<button onClick={handleLikeButton}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {removeBlogButton()}
      <h2>comments</h2>
      <ul>
        {blog.comments.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
      </ul>
    </div>
  )
}

export default Blog
