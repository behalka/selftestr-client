import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import Notification from './Notification'

const MAX_DISPLAYED = 3
const Panel = ({ notifications, removeHandler }) =>
  <div className="panel panel--fixed">
    <div className="panel__container">
      <ul className="list list--block list--no-bullets">
        {notifications.slice(0, MAX_DISPLAYED).map(notification =>
          <li key={notification.uid}>
            <Notification
              message={notification}
              removeHandler={removeHandler}
            />
          </li>
          )}
      </ul>
    </div>
  </div>
Panel.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired,
}

export default Panel
