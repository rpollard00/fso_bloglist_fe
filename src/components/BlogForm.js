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

export default BlogForm