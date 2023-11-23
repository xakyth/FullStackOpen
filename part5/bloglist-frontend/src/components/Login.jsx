const Login = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => {
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