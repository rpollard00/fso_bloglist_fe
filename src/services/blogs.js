import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blogObj) => {
  const blogUrl = baseUrl + '/' + blogObj.id
  const likedBlog = {...blogObj, "likes": Number(blogObj.likes) + 1}
  const response = await axios.put(blogUrl, likedBlog)

  return response.data
}

const exports = {
  setToken,
  getAll,
  postBlog,
  likeBlog,
}

export default exports