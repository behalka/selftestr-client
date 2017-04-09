import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message, removeHandler }) => {
  const removeMe = () => removeHandler(message)
  return (
    <Alert bsSize="warning" onDismiss={removeMe}>
      {message.text}
    </Alert>
  )
}
Notification.propTypes = {
  message: PropTypes.object.isRequired,
  removeHandler: PropTypes.func.isRequired,
}
export default Notification
