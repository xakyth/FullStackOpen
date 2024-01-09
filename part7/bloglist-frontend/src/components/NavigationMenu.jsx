import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const NavigationMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
  }

  const linkStyle = {
    paddingRight: 10,
  }

  return (
    <div>
      <Link to={'/'} style={linkStyle}>
        blogs
      </Link>
      <Link to={'/users'} style={linkStyle}>
        users
      </Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavigationMenu
