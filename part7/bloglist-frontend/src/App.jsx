import { useEffect } from 'react'
import Login from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initUserFromStorage, logout } from './reducers/loginReducer'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import NavigationMenu from './components/NavigationMenu'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUserFromStorage())
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <NavigationMenu />
      <h1>blog app</h1>
      <Routes>
        <Route element={<User />} path='/users/:id' />
        <Route element={<Users />} path='/users' />
        <Route element={<BlogList />} path='/' />
        <Route element={<Blog />} path='/blogs/:id' />
      </Routes>
    </div>
  )
}

export default App
