import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useEffect, useRef } from 'react'
import { initBlogs } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  const addBlog = async (blogObject) => {
    dispatch(createBlog(blogObject)).then((blog) => {
      if (blog)
        dispatch(
          setNotification({
            message: `a new blog ${blog.title} by ${blog.author} added`,
            type: NOTIFICATION_TYPE.SUCCESS,
          })
        )
    })
    refBlogForm.current.toggleVisibility()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const refBlogForm = useRef()

  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <Togglable buttonLabel='new note' ref={refBlogForm}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
