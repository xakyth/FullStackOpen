import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpanded = () => setExpanded(!expanded)

  const handleLike = (event) => {
    const updBlog = { ...blog, likes: blog.likes + 1 }
    blogService.updateBlog(updBlog)
    setBlogs(blogs.map((b) => b.id === blog.id ? updBlog : b))
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenExpanded}>
        <div>{blog.title} <button onClick={toggleExpanded}>view</button></div>
      </div>
      <div style={showWhenExpanded}>
        <div>{blog.title} <button onClick={toggleExpanded}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog