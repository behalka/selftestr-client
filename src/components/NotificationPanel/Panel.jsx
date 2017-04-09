import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import Notification from './Notification'

const Panel = ({ notifications, removeHandler }) =>
  <div className="panel panel--fixed">
      <ul className="list list--block list--no-bullets">
        {notifications.map(notification =>
          <li key={notification.uid}>
            <Notification
              message={notification}
              removeHandler={removeHandler}
            />
          </li>
          )}
      </ul>
  </div>
Panel.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired,
}

export default Panel
