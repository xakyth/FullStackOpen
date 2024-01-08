import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

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
          <input
            id='username'
            type='text'
            name='Username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            id='password'
            type='password'
            name='Password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <button id='login-button' type='submit'>
            login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
