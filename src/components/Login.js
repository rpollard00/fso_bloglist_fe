import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(loginUser),
      )
      dispatch(setUser(loginUser))
      blogService.setToken(loginUser.token)
      setUsername('')
      setPassword('')
      dispatch(
        setNotification(
          `Successfully logged in as ${loginUser.name} at ${new Date()}`,
          'info',
        ),
      )
      navigate('/')
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed login attempt at ${new Date()} - ${
            exception.response.data.error
          }`,
          'error',
        ),
      )
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div className="field">
          <label className="label">username</label>
          <div className="control has-icons-left has-icons-right">
            <input
              id="username"
              type="text"
              className="input"
              value={username}
              placeholder="Username"
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">password</label>
          <div className="control has-icons-left has-icons-right">
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              placeholder="password123"
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </div>

        <div className="control">
          <button id="login-button" className="button is-link" type="submit">
          login
          </button>
        </div>

      </form>
    </div>
  )
}

export default Login
