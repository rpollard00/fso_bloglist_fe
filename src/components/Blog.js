import { useState } from 'react'

const Blog = ({blog}) => {
  const style = {
    borderStyle: "solid"
  }
  const [showDetailed, setShowDetailed] = useState(false)
  const handleShowDetailed = event => {
    console.log("showDetailed", showDetailed)
    setShowDetailed(!showDetailed)
  }
  if (showDetailed === true) {
    return (
      <div style={style}>
        {blog.title}, by {blog.author}<button onClick={handleShowDetailed}>hide</button><br/>
        {blog.url}<br/>
        {blog.likes}<br/>
        {blog.user.name}<br/><br/>
      </div>
    )
  }
  
  return (
    <div>
      {blog.title}, by {blog.author} <button onClick={handleShowDetailed}>view</button>
    </div>  
  )
}

const Blogs = ({blogs}) => {
  return (
    <>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}  
    </>
    )

}

export default Blogs