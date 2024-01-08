import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import NOTIFICATION_TYPE from '../constants/NotificationType'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const initUserFromStorage = () => {
  return (dispatch) => {
    const loggedUser = loginService.getLoggedUser()
    if (loggedUser) {
      dispatch(userSlice.actions.setUser(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      dispatch(userSlice.actions.setUser(user))
      loginService.setLoggedUser(user)
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(
        setNotification({
          message: 'wrong username or password',
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(userSlice.actions.setUser(null))
    loginService.clearLoggedUser()
    blogService.setToken(null)
  }
}

export default userSlice.reducer
