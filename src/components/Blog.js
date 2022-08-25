/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 5,
  }

  const navigate = useNavigate()

  if (!blog) return null

  return (
    <>
      <div style={style}>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <div>
          {blog.likes} likes
          <button id="btn-like" onClick={() => {dispatch(likeBlog(blog))}}>
            like
          </button>
          {user.id === blog.user.id ? <button id="btn-delete" onClick={() => {
            dispatch(removeBlog(blog))
            dispatch(setNotification(`Alert: ${blog.title} deleted.`, 5))
            navigate('/')
          }}>
            delete
          </button> : null}
        </div>
        <a href={`http://${blog.url}`}>{blog.url}</a>
        <div>added by {blog.user.name}</div>
      </div>
    </>
  )
}

export default Blog
