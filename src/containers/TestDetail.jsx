import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTestById } from '../redux/testModels/tests.actions'
import { getTestFromParams } from '../redux/testModels/tests.selectors'

import TestDetailContainer from '../components/TestsOverview/TestDetail'
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
    if (!this.props.test) {
      this.props.fetchTestById(testId)
    }
  }
  render() {
    const { test } = this.props
    return (
      <div>
        {!test && <Loader />}
        {test && <TestDetailContainer test={test} />}
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