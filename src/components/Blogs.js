/* eslint-disable react-redux/useSelector-prefer-selectors */
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import Togglable from './Togglable'

const Blog = ({ blog }) => {

  // blogDelete happens in here, after the blog is deleted, we need to tell App to update the blogList and remove the id
  // of the blog we just deleted, soooo the function that would do that would live in App.js, which means that the useRef goes here,
  // useRef calls the function IN app.js in the handleDelete function here

  if (!blog.id) {
    return null
  }

  return (
    <p className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}, by {blog.author}
      </Link>
    </p>
  )
}

const Blogs = () => {
  //const dispatch = useDispatch()

  //dispatch(sortBlogs())
  const blogs = useSelector((state) => state.blogs)

  return (
    <div className="content">
      <h2 className="h2">blogs</h2>
      <div className="block">
        <Togglable buttonLabel="new blog">
          <BlogForm />
        </Togglable>
      </div>
      <div className="content">
        {blogs.map((blog) => {
          if (!blog) return null // async delete messes up so gotta guard
          return (
            <Blog
              key={blog.id}
              blog={blog}
            />
          )
        })}
      </div>
    </div>
  )
}

export { Blog, Blogs }
