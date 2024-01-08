import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    },
  },
})

export const setNotification = (notification, timeout) => {
  if (!timeout) timeout = 5000
  return (dispatch, getState) => {
    dispatch(notificationSlice.actions.setNotification(notification))
    setTimeout(() => {
      dispatch(notificationSlice.actions.removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer
