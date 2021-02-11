const styling = {
  color: 'darkGreen',
  fontSize: 20,
  padding: 10,
  borderRadius: 5,
  borderStyle: 'solid',
  marginBottom: 10
}

const Notification = ({ message }) => {
  if (message) {
    return <div style={styling}>{message}</div>
  } else {
    return null;
  }
}

export default Notification 