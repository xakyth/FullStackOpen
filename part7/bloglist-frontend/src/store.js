import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: loginReducer,
  },
})
