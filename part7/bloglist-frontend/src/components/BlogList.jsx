import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useEffect, useRef } from 'react'
import { initBlogs } from '../reducers/blogsReducer'

const BlogList = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  const addLike = async (blog) => {
    dispatch(updateBlog(blog))
  }

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

  const removeBlog = async (blog) => {
    dispatch(deleteBlog(blog))
  }

  const refBlogForm = useRef()

  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <Togglable buttonLabel='new note' ref={refBlogForm}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={addLike}
          user={user}
          handleRemove={removeBlog}
        />
      ))}
    </div>
  )
}

export default BlogList
