import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification === null) {
    return null
  }
  const { type, message } = notification
  return (
    <div>
      <Alert color={type} variant='filled'>
        {message}
      </Alert>
    </div>
  )
}

export default Notification
