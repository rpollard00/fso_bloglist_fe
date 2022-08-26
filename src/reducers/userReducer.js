import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    updateToken(state, action) {
      return { ...state, token: action.payload }
    },
    updateName(state, action) {
      return { ...state, name: action.payload }
    },
    removeUser(_state, _action) {
      return null
    },
  },
})

export const { setUser, updateToken, updateName } = userSlice.actions

export default userSlice.reducer
