import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

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
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/' variant='outlined'>
            blogs
          </Button>
          <Button
            color='inherit'
            component={Link}
            to='/users'
            variant='outlined'
          >
            users
          </Button>
          <Typography sx={{ marginLeft: 'auto' }}>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavigationMenu
