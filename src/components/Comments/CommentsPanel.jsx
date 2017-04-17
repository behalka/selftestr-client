import React, { PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { Link } from 'react-router'
import Comment from './Comment'
import AddCommentForm from './AddCommentForm'

const CommentsPanel = ({ comments, user, handleSubmit }) =>
  <div>
    <ul className="list list--block list--no-bullets">
      {comments.map(comment =>
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
        )}
    </ul>
    <Panel header="Přidat komentář">
      {user.isLogged
        ? <AddCommentForm onSubmit={handleSubmit} />
        : 'Pro přidání komentáře se musíte přihlásit.'}
    </Panel>
  </div>

CommentsPanel.propTypes = {
  comments: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default CommentsPanel
