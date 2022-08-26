/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleBlogInput = (event) => {
    if (event.target.name === 'title') {
      setTitle(event.target.value)
    } else if (event.target.name === 'author') {
      setAuthor(event.target.value)
    } else {
      setUrl(event.target.value)
    }
  }

  const addBlog = async (blogObj) => {
    try {
      //const blogUser = blogObj.user // extract user information
      const blogToAdd = await blogService.postBlog(blogObj)
      const blogWithUser = { ...blogToAdd, user }
      dispatch(appendBlog(blogWithUser))
      //hideBlogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `Blog Entry ${blogObj.title} added by user ${user.username}`,
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed to create new blog post - ${exception.response.data.error}`,
          5,
        ),
      )
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
    addBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            title:
            <input
              type="text"
              id="title"
              value={title}
              name="title"
              placeholder="Title"
              onChange={handleBlogInput}
            />
          </li>
          <li>
            author:
            <input
              type="text"
              id="author"
              value={author}
              name="author"
              placeholder="Author"
              onChange={handleBlogInput}
            />
          </li>
          <li>
            url:
            <input
              type="text"
              id="url"
              value={url}
              name="url"
              placeholder="www.website.com"
              onChange={handleBlogInput}
            />
          </li>

        </ul>
        <button className="button is-link" id="submit-button" type="submit">
            create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
