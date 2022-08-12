import { useState } from 'react'

const BlogForm = ({ addBlogHandler, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogInput = (event) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    } else if (event.target.name === 'author') {
      setAuthor(event.target.value)
    } else {
      setUrl(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
      user: {
        name: user.name,
        username: user.username,
      },
    }
    addBlogHandler(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>title:<input type="text" value={title} name="title" placeholder='Title' onChange={handleBlogInput}/></li>
          <li>author:<input type="text" value={author} name="author" placeholder='Author' onChange={handleBlogInput}/></li>
          <li>url:<input type="text" value={url} name="url" placeholder='www.website.com' onChange={handleBlogInput}/></li>
          <button type="submit">create</button>
        </ul>
      </form>
    </div>
  )
}

export default BlogForm