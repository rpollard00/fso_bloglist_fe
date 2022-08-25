import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blogObj) => {
  const blogUrl = baseUrl + '/' + blogObj.id
  const likedBlog = { ...blogObj, likes: Number(blogObj.likes) + 1 }
  await axios.put(blogUrl, likedBlog)

  return likedBlog
}

const deleteBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl + '/' + blogObj.id
  const response = await axios.delete(blogUrl, config)

  return response
}

const postComment = async (commentObj, blogId) => {
  const commentUrl = `${baseUrl}/${blogId}/comments`
  const response = await axios.post(commentUrl, commentObj)
  return response.data
}

const exports = {
  setToken,
  getAll,
  postBlog,
  likeBlog,
  deleteBlog,
  postComment,
}

export default exports
