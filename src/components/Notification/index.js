import './Notification.css'

const Notification = ({ text, clear, isError = false }) => {
  if (text == null) return
  const classes = `notification-container ${isError ? 'error' : ''}`
  return (
    <div className={classes}>
      <p>{text}</p>
      <button onClick={clear}>X</button>
    </div>
  )
}

export default Notification;
