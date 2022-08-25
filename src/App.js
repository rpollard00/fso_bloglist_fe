/* eslint-disable indent */
/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Blog from './components/Blog'
import { Blogs } from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { setBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import usersService from './services/users'

const App = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    usersService.getAll().then((users) => setUsers(users))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loginUser))
      blogService.setToken(loginUser.token)
    }
  }, [])

  const match = useMatch('/users/:id')
  const userSelected = match
    ? users.find((u) => {
        return u.id === match.params.id
      })
    : null

  const blogMatch = useMatch('/blogs/:id')
  const blogSelected = blogMatch
    ? blogs.find((u) => {
        return u.id === blogMatch.params.id
      })
    : null

  const handleLogout = () => {
    dispatch(setUser(null))
    blogService.setToken(null)
    window.localStorage.clear()
    showNotification('Logout successful', 'info')
  }

  const showNotification = (message, _style) => {
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
    const padding = {
      padding: 5
    }
    return (
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
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
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={userSelected} />} />
        <Route path="/blogs/:id" element={<Blog blog={blogSelected} />} />
      </Routes>
    </>
  )
}

export default App
