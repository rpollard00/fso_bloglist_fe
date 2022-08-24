import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Blogs } from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { appendBlog, setBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [notificationMessage, setNotificationMessage] = useState(null)
  //const [notificationStyle, setNotificationStyle] = useState('info')
  const dispatch = useDispatch()
  const hideBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      showNotification(
        `Successfully logged in as ${user.name} at ${new Date()}`,
        'info',
      )
    } catch (exception) {
      showNotification(
        `Failed login attempt at ${new Date()} - ${
          exception.response.data.error
        }`,
        'error',
      )
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.clear()
    showNotification('Logout successful', 'info')
  }

  const addBlog = async (blogObj) => {
    try {
      const user = blogObj.user // extract user information
      const blogToAdd = await blogService.postBlog(blogObj)
      dispatch(appendBlog(blogToAdd))
      hideBlogFormRef.current.toggleVisibility()
      showNotification(
        `Blog Entry ${blogObj.title} added by user ${user}`,
        'info',
      )
    } catch (exception) {
      showNotification(
        `Failed to create new blog post - ${exception.response.data.error}`,
        'error',
      )
    }
  }

  const showNotification = (message, style) => {
    console.log(`${message} ${style}`)
    dispatch(setNotification(`Notification: ${message}`, 5))
  }

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )

  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={hideBlogFormRef}>
        <BlogForm addBlogHandler={addBlog} user={user} />
      </Togglable>
      <Blogs user={user} />
    </div>
  )

  return <div>{user === null ? loginView() : blogView()}</div>
}

export default App
