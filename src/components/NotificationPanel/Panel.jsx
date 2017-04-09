import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import Notification from './Notification'

const Panel = ({ notifications, removeHandler }) =>
  <Row className="panel">
    <Col xs={12}>
      <ul>
        {notifications.map(notification =>
          <li key={notification.uid}>
            <Notification
              message={notification}
              removeHandler={removeHandler}
            />
          </li>
          )}
      </ul>
    </Col>
  </Row>
Panel.propTypes = {
  notifications: PropTypes.array.isRequired,
  removeHandler: PropTypes.func.isRequired,
}

export default Panel
