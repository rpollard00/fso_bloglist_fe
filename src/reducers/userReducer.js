import { createSlice } from '@reduxjs/toolkit'

// username
// password
// name
// token
// id

const initialState = {
  name: null,
  username: null,
  id: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
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
      return initialState
    },
  },
})

export const { setUser, updateToken, updateName } = userSlice.actions

export default userSlice.reducer
