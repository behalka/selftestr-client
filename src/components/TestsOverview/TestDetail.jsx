import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'

const TestDetail = ({ test }) =>
  <div className="test-detail">
    {console.log(test)}
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
      <h2>Komentáře</h2>
      <ul>
        {test.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </Row>
  </div>

TestDetail.propTypes = {
  test: PropTypes.object.isRequired,
}
export default TestDetail
