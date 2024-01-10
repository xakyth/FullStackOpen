import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Button, TextField } from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id='username'
            type='text'
            name='Username'
            value={username}
            onChange={handleUsernameChange}
            label='username'
            size='small'
          />
        </div>
        <br />
        <div>
          <TextField
            id='password'
            type='password'
            name='Password'
            value={password}
            onChange={handlePasswordChange}
            label='password'
            size='small'
          />
        </div>
        <br />
        <div>
          <Button
            id='login-button'
            type='submit'
            variant='contained'
            color='primary'
          >
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
