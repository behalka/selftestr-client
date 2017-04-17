import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome'

const Comment = ({ comment }) =>
  <div>
    <Panel header={`Uživatel ${comment.user.username} napsal:`}>
      {comment.text}
    </Panel>
  </div>
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
}

export default Comment
