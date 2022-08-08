import { useEffect, useState } from 'react'
import Blogs from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
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
    } catch (exception) {
      console.log("error logging in")
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
    window.localStorage.clear()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title,
        author,
        url,
      }
      
      const blogToAdd = await blogService.postBlog(newBlog)
      
      const bloglist = blogs.concat(blogToAdd)
      setBlogs(bloglist)

      setTitle('')
      setAuthor('')
      setUrl('')
      
    } catch(exception) {
      console.log("Error", exception)
    }
    console.log('Blogservice post')
  }

  const handleBlogInput = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value)
    } else if (event.target.name === "author") {
      setAuthor(event.target.value)
    } else {
      setUrl(event.target.value)
    }
    console.log(event.target.name)
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
      <p>{user.name} logged in<button onClick={handleLogout}>Logout</button></p>
      <Blogs 
        blogs={blogs}
        submitHandler={handleSubmit}
        title={title}
        author={author}
        url={url}
        blogChangeHandler={handleBlogInput}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}/>
    </div>
  )
 
  return (
    <div>
      {user === null ? loginView() : blogView()}
    </div>
  )
}

export default App
