import { useState } from "react"

const Blog = ({ blog, handleLike, handleRemove, user }) => {
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

  const handleLikeButton = (event) => {
    handleLike({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlogButton = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog)
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

  return (
    <div style={blogStyle}>
      <div style={hideWhenExpanded}>
        <div>{blog.title} <button onClick={toggleExpanded}>view</button></div>
      </div>
      <div style={showWhenExpanded}>
        <div>{blog.title} <button onClick={toggleExpanded}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikeButton}>like</button></div>
        <div>{blog.author}</div>
        {removeBlogButton()}
      </div>
    </div>
  )
}

export default Blog