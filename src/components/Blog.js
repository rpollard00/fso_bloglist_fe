const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

//        username<input type="text" value={username} name="Username"
//          onChange={({ target }) => setUsername(target.value)}/>

const BlogForm = (params) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={params.submitHandler}>
        <ul>
        <li>title:<input type="text" value={params.title} name="title" onChange={params.blogChangeHandler}/></li>
        <li>author:<input type="text" value={params.author} name="author" onChange={params.blogChangeHandler}/></li>
        <li>url:<input type="text" value={params.url} name="url" onChange={params.blogChangeHandler}/></li>
        <button type="submit">create</button>
        </ul>
      </form>
    </div>
  )
}

const Blogs = ({blogs, submitHandler, title, author, url, blogChangeHandler}) => {
  return (
    <>
    <BlogForm 
      submitHandler={submitHandler} 
      title={title} 
      author={author} 
      url={url}
      blogChangeHandler={blogChangeHandler}
    />
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}  
    </>
    )

}

export default Blogs