import React, { PropTypes } from 'react'
import { PageHeader } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import TestsListItem from './TestsListItem'

const TestsList = ({ tests }) =>
  <div>
    <ul className="tests">
      {tests.map(test => <TestsListItem key={test.id} test={test} />)}
    </ul>
  </div>

TestsList.propTypes = {
  tests: PropTypes.array,
}

TestsList.defaultProps = {
  tests: [],
}

export default TestsList
