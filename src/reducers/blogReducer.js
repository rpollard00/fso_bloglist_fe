import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(_state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.map((b) => (b.id !== id ? b : null))
    },
    like(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      return state.map((b) => (b.id !== id ? b : changedBlog))
    },
    sortBlogs(state, _action) {
      return state.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { createBlog, appendBlog, removeBlog, setBlogs, like, sortBlogs } =
  blogSlice.actions
export default blogSlice.reducer
