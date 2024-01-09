import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { useEffect, useState } from 'react'

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()
  useEffect(() => {
    userService.getById(id).then((u) => setUser(u))
  }, [id])

  console.log('user', user)
  if (!user) return null
  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User
