

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

//        username<input type="text" value={username} name="Username"
//          onChange={({ target }) => setUsername(target.value)}/>



const Blogs = ({blogs, title, author, url}) => {
  return (
    <>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}  
    </>
    )

}

export default Blogs