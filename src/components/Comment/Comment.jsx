import React, { PropTypes } from 'react'
// import { Button, Row, Col } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome'

const Comment = ({ comment }) =>
  <div>
    {comment.text}
  </div>
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
