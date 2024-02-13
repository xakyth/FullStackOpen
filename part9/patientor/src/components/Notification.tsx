import { Alert } from '@mui/material';

const Notification = ({ message }: { message: string }) => {
  if (!message || message.length == 0) return null;

  return <Alert severity='error'>${message}</Alert>;
};

export default Notification;
