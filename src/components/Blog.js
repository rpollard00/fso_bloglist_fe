/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router'
import { likeBlog, removeBlog, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const Comment = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  //console.log(props.blog)

  const match = useMatch('/blogs/:id')
  const blogId = match.params.id

  const addComment = async (comment) => {
    if (!blog) return null

    try {
      const commentToAdd = await blogService.postComment(comment, blogId)
      //console.log('commentToAdd', commentToAdd)
      const updatedBlog = { ...blog, comments: [...blog.comments, commentToAdd] || [commentToAdd] }
      console.log('updatedBlog', blog)
      dispatch(updateBlog(updatedBlog))

      dispatch(
        setNotification(
          `Comment ${comment.content} added `,
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotification(
          `Failed to create new comment - ${exception.response.data.error}`,
          5,
        ),
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newComment = {
      content: comment
    }
    //console.log(newComment)
    addComment(newComment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="input" value={comment} onChange={(event) => setComment(event.target.value)} type="text"></input>
      <button className="button">add comment</button>
    </form>
  )
}

const Blog = ({ blog }) => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 5,
  }

  const getUserId = () => {
    if (!user) return null

    return user
  }

  const navigate = useNavigate()

  if (!blog) return null

  return (
    <>
      <div className="box" style={style}>
        <h2 className="subtitle is-strong">
          {blog.title} by {blog.author}
        </h2>
        <div>
          {blog.likes} likes
          <button className="button" id="btn-like" onClick={() => {dispatch(likeBlog(blog))}}>
            like
          </button>
          {getUserId() === blog.user.id ? <button className="button" id="btn-delete" onClick={() => {
            dispatch(removeBlog(blog))
            dispatch(setNotification(`Alert: ${blog.title} deleted.`, 5))
            navigate('/')
          }}>
            delete
          </button> : null}
        </div>
        <a href={`http://${blog.url}`}>{blog.url}</a>
        <div>added by {blog.user.name}</div>

        <h3>Comments</h3>
        <Comment blog={blog}/>
        <ul>
          {
            blog.comments
              ? blog.comments.map((c) => {
                return (<li key={c.id}>{c.content}</li>)
              })
              : null
          }
        </ul>
      </div>
    </>
  )
}

export default Blog
