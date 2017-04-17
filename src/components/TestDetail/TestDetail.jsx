import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import CommentsPanel from '../Comments/CommentsPanel'

const TestDetail = ({ test, user, handleSubmit }) =>
  <div className="test-detail">
    <Row>
      <Col sm={8}>
        <h1>{test.name}</h1>
        <div>
          {test.description}
        </div>
      </Col>
      <Col sm={4}>
        Hodnocení: {test.ranking.value} (počet hodnotících: {test.ranking.count})
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <h2>Komentáře</h2>
        <CommentsPanel comments={test.comments} user={user} handleSubmit={handleSubmit} />
      </Col>
    </Row>
  </div>

TestDetail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
export default TestDetail
