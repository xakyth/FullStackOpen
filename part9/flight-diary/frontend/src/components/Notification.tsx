const Notification = ({ message }: { message: string }) => {
  if (message.length == 0) return null;

  const inlineStyle = {
    color: 'red',
  };

  return (
    <div style={inlineStyle}>
      <h3>{message}</h3>
    </div>
  );
};

export default Notification;
