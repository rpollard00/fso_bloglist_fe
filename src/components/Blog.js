import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const style = {
    borderStyle: "solid"
  }
  const [showDetailed, setShowDetailed] = useState(false)
  //const [blogLikes, setBlogLikes] = useState(blog.likes)
  const [blogState, setBlogState] = useState(blog)
  const handleShowDetailed = event => {
    console.log("showDetailed", showDetailed)
    setShowDetailed(!showDetailed)
  }

  const handleLikes = async (id) => {
    const response = await blogService.likeBlog(blogState)
    return setBlogState(response)
  }

  if (showDetailed === true) {
    return (
      <div style={style}>
        {console.log("Are you rerendering?")}
        {blogState.title}, by {blogState.author}<button onClick={handleShowDetailed}>hide</button><br/>
        {blogState.url}<br/>
        {blogState.likes}<button onClick={() => handleLikes(blogState.id)}>like</button><br/>
        {blogState.user.name}<br/><br/>
      </div>
    )
  }
  
  return (
    <div>
      {blogState.title}, by {blogState.author} <button onClick={handleShowDetailed}>view</button>
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