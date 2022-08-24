import { createSlice } from '@reduxjs/toolkit'

let timer

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, style: 'hidden' },
  reducers: {
    updateNotification(_state, action) {
      const message = action.payload
      return { message: message, style: 'notify' }
    },
    removeNotification(_state, _action) {
      return { message: null, style: 'hidden ' }
    },
  },
})

export const setNotification = (message, timeoutSeconds) => {
  return async (dispatch) => {
    dispatch(updateNotification(`${message}`))
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(removeNotification())
    }, timeoutSeconds * 1000)
  }
}

export const { updateNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
