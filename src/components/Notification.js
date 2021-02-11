const Notification = ({ message }) => {
  if (message) {
    let styling; 
    if (message.toLowerCase().includes('error')) {
      styling = {
        color: 'red',
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
        borderStyle: 'solid',
        marginBottom: 10
      }
    } else {
      styling = {
        color: 'darkGreen',
        fontSize: 20,
        padding: 10,
        borderRadius: 5,
        borderStyle: 'solid',
        marginBottom: 10
      }
    }
    return <div style={styling}>{message}</div>
  } else {
    return null;
  }
}

export default Notification 