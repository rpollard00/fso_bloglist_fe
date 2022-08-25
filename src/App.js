/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { Blogs } from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import { setBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const user = useSelector((state) => state.user)
  //const [notificationMessage, setNotificationMessage] = useState(null)
  //const [notificationStyle, setNotificationStyle] = useState('info')
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loginUser))
      blogService.setToken(loginUser.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(setUser(null))
    blogService.setToken(null)
    window.localStorage.clear()
    showNotification('Logout successful', 'info')
  }

  const showNotification = (message, style) => {
    console.log(`${message} ${style}`)
    dispatch(setNotification(`Notification: ${message}`, 5))
  }

  const LogoutButton = () => {
    if (user === null) return

    return (
      <p>
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </p>
    )
  }

  const Nav = () => {
    return (
      <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        <LogoutButton />
      </div>
    )
  }

  //return <div>{user === null ? loginView() : blogView()}</div>
  return (
    <>
      <Nav />
      <Notification />
      <Routes>
        <Route path="/" element={user === null ? <Login /> : <Blogs />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default App
