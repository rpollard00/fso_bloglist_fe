import { useRef, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const style = {
    borderStyle: "solid",
    padding: 2,
    paddingLeft: 10,
  }
  const [showDetailed, setShowDetailed] = useState(false)
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
        {blogState.title}, by {blogState.author}<button onClick={handleShowDetailed}>hide</button><br/>
        {blogState.url}<br/>
        {blogState.likes}<button onClick={() => handleLikes(blogState.id)}>like</button><br/>
        {blogState.user.name}<br/><br/>
      </div>
    )
  }
  
  return (
    <div style={style}>
      {blogState.title}, by {blogState.author} <button onClick={handleShowDetailed}>view</button>
    </div>  
  )
}

const Blogs = ({blogs}) => {
  return (
    <>
    {blogs.sort((a,b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog}/>)}  
    </>
    )

}

export default Blogs