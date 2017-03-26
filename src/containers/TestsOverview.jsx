import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTestList } from '../redux/testsOverview/tests.actions'
import { getTestHeaders } from '../redux/testsOverview/tests.selectors'

import Loader from '../components/layout/Loader'
import TestsList from '../components/TestsOverview/TestsList'
import TestsHeader from '../components/TestsOverview/TestsHeader'

class TestsOverview extends Component {
  static propTypes = {
    fetchTestList: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    tests: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { tests } = this.props
    if (!tests.isFetching && tests.items.length === 0) {
      console.log('dispatching fetch')
      this.props.fetchTestList()
    }
  }
  render() {
    const { isFetching, items } = this.props.tests
    console.log(this.props.tests)
    // varianty: error stav -> globalne, loading anebo ne
    return (
      <div>
        <p>futurebreadcrumbs: {this.props.route.path}</p>
        <TestsHeader />
        {isFetching && <Loader />}
        {!isFetching && <TestsList tests={items} />}
      </div>
    )
  }
}

// todo: use reselect
const mapStateToProps = state => ({
  tests: getTestHeaders(state),
})
const mapDispatchToProps = {
  fetchTestList,
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsOverview)
