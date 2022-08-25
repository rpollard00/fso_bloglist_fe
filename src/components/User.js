import { Link } from 'react-router-dom'

const User = ({ user }) => {
  const style = {
    border: 'solid',
    padding: 5,
  }

  if (!user) return null

  return (
    <>
      {user.blogs.map((blog) => {
        return (
          <div style={style} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default User
