import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import Comment from '../Comment/Comment'

const TestDetail = ({ test }) =>
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
        <ul>
          {test.comments.map(comment =>
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>)}
        </ul>
      </Col>
    </Row>
  </div>

TestDetail.propTypes = {
  test: PropTypes.object.isRequired,
}
export default TestDetail
