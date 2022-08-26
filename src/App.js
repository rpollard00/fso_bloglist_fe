/* eslint-disable indent */
/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, Route, Routes, useMatch } from 'react-router-dom'
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
  const [navActive, setNavActive] = useState(false)
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
    if (user === null) return null

    return (
        <button className="button is-danger is-small" id="logout-button" onClick={handleLogout}>
          Logout
        </button>
    )
  }


  const Nav = () => {
    return (
      <div className="navbar" role="navigation" aria-label="main navigation">
          <a role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setNavActive(!navActive)}
            data-target="navbarMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
          </a>

        <div id="navbarMenu" className={navActive ? 'navbar-menu is-active' : 'navbar-menu'}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/">home</Link>
            <Link className="navbar-item" to="/users">users</Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  //return <div>{user === null ? loginView() : blogView()}</div>
  return (
    <>
      <Nav />
      <Notification />
      <div className="section">
      <Routes>
        <Route path="/" element={user ? <Blogs /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login/>} />
        <Route path="/users/:id" element={<User user={userSelected} />} />
        <Route path="/blogs/:id" element={<Blog blog={blogSelected} />} />
      </Routes>
      </div>
    </>
  )
}

export default App
