import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'REMOVE':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useNotify = () => {
  const dispatch = useNotificationDispatch()
  return (payload) => {
    dispatch({ type: 'SET', payload })
    setTimeout(() => {
      dispatch({ type: 'REMOVE', payload })
    }, 5000)
  }
}

export default NotificationContext