import { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("error logging in")
    }
    
    
    console.log("do the login things")
  }

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
      <div>
        username<input type="text" value={username} name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password<input type="password" value={password} name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
      </form>
    </div>
  )
  const blogView = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      {user === null ? loginView() : blogView()}
    </div>
  )
}

export default App
