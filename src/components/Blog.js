import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, user, handleNotification, updateList}) => {
  const style = {
    borderStyle: "solid",
    padding: 2,
    paddingLeft: 10,
  }

  const hiddenStyle = {
    display: "none",
  }

  const visibleStyle = {
    color: "white",
    backgroundColor: "blue",
  }
  
  const [showDetailed, setShowDetailed] = useState(false)
  const [blogState, setBlogState] = useState(blog)
  const handleShowDetailed = event => {
    setShowDetailed(!showDetailed)
  }

  const handleLikes = async (id) => {
    const response = await blogService.likeBlog(blogState)
    return setBlogState(response)
  }
  // blogDelete happens in here, after the blog is deleted, we need to tell App to update the blogList and remove the id
  // of the blog we just deleted, soooo the function that would do that would live in App.js, which means that the useRef goes here,
  // useRef calls the function IN app.js in the handleDelete function here

  const handleDelete = async () => {
    if (window.confirm("Delete post?")) {
      handleNotification(`Deleted post ${blogState.title}`, "info")
      
      const response = await blogService.deleteBlog(blogState)
      updateList()

      return response
    } 
  }

  if (showDetailed === true) {
    return (
      <div style={style}>
        {blogState.title}, by {blogState.author}<button onClick={handleShowDetailed}>hide</button><br/>
        {blogState.url}<br/>
        {blogState.likes}<button onClick={() => handleLikes(blogState.id)}>like</button><br/>
        {blogState.user.name}<br/><br/>
        <button style={ user.username === blogState.user.username ? visibleStyle : hiddenStyle} 
          onClick={() => handleDelete(blogState)}>Remove</button>
      </div>
    )
  }
  
  return (
    <div style={style}>
      {blogState.title}, by {blogState.author} <button onClick={handleShowDetailed}>view</button>
    </div>  
  )
}

const Blogs = ({blogs, user, handleNotification, updateList}) => {  
  const renderBlogs = () => {
    return (
      <>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog => 
          <Blog 
            key={blog.id} 
            blog={blog} 
            user={user} 
            handleNotification={handleNotification}
            updateList={updateList}
        />)}  
      </>
    )
  }
  return (
      <div>
        {renderBlogs()}
      </div>
    )

}

export default Blogs