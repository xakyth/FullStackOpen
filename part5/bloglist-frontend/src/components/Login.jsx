import { useState } from 'react'

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div><input type="text" name="Username" value={username} onChange={handleUsernameChange} /></div>
        <div><input type="password" name="Password" value={password} onChange={handlePasswordChange} /></div>
        <div><button type="submit">login</button></div>
      </form>
    </div>
  )
}

export default Login