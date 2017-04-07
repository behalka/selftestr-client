import React, { PropTypes } from 'react'
// import { Button, Row, Col } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome'

const Comment = ({ comment }) =>
  <div>
    <p>
      Uživatel {comment.author.username} napsal:
    </p>
    <p>
      {comment.text}
    </p>
  </div>
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
