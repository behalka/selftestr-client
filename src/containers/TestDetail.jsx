import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTestById } from '../redux/testsOverview/tests.actions'
import { getTestFromParams } from '../redux/testsOverview/tests.selectors'

import Loader from '../components/layout/Loader'

class TestDetail extends Component {
  static defaultProps = {
    test: null,
  }
  static propTypes = {
    fetchTestById: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    test: PropTypes.object,
  }
  componentDidMount() {
    const { test_id: testId } = this.props.params
    // todo: nebo chybi detail
    if (!this.props.test || !this.props.test.comments) {
      this.props.fetchTestById(testId)
    }
  }
  render() {
    const { test } = this.props
    return (
      <div>
        {!test && <Loader />}
        {test && test.name}
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  test: getTestFromParams(state, props),
})
const mapDispatchToProps = {
  fetchTestById,
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDetail)
