/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleDelete }) => {
  const dispatch = useDispatch()
  const style = {
    borderStyle: 'solid',
    padding: 2,
    paddingLeft: 10,
  }

  const hiddenStyle = {
    display: 'none',
  }

  const visibleStyle = {
    color: 'white',
    backgroundColor: 'blue',
  }

  const [showDetailed, setShowDetailed] = useState(false)
  //const [blogState, setBlogState] = useState(blog)
  const handleShowDetailed = () => {
    setShowDetailed(!showDetailed)
  }

  const handleLikes = async () => {
    await blogService.likeBlog(blog)
    dispatch(like(blog.id))
  }
  // blogDelete happens in here, after the blog is deleted, we need to tell App to update the blogList and remove the id
  // of the blog we just deleted, soooo the function that would do that would live in App.js, which means that the useRef goes here,
  // useRef calls the function IN app.js in the handleDelete function here

  if (!blog.id) {
    return null
  }

  if (showDetailed === true) {
    return (
      <div className="blog" style={style}>
        {blog.title}, by {blog.author}
        <button onClick={handleShowDetailed}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} likes
        <button id="btn-like" onClick={() => handleLikes(blog.id)}>
          like
        </button>
        <br />
        {blog.user.name}
        <br />
        <br />
        <button
          id="remove-button"
          style={
            user.username === blog.user.username ? visibleStyle : hiddenStyle
          }
          onClick={() => handleDelete(blog)}
        >
          Remove
        </button>
      </div>
    )
  }

  return (
    <div className="blog" style={style}>
      {blog.title}, by {blog.author}{' '}
      <button className="show" onClick={handleShowDetailed}>
        view
      </button>
    </div>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleDelete = async (blog) => {
    if (window.confirm('Delete post?')) {
      dispatch(setNotification(`Deleted post ${blog.title}`))
      dispatch(removeBlog(blog.id))
      const response = await blogService.deleteBlog(blog)

      return response
    }
  }

  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  return (
    <>
      {blogs.map((blog) => {
        if (!blog) return null // async delete messes up so gotta guard
        return (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleDelete={handleDelete}
          />
        )
      })}
    </>
  )
}

export { Blog, Blogs }
