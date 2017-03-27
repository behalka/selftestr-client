import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTestList } from '../redux/testsOverview/tests.actions'
import { getTestHeaders } from '../redux/testsOverview/tests.selectors'
import { getPopularTags } from '../redux/tags/tags.selectors'
import { fetchPopularTags } from '../redux/tags/tags.actions'

import Loader from '../components/layout/Loader'
import TestsList from '../components/TestsOverview/TestsList'
import TestsHeader from '../components/TestsOverview/TestsHeader'
import PopularTags from '../components/TestsOverview/PopularTags'

class TestsOverview extends Component {
  static propTypes = {
    fetchPopularTags: PropTypes.func.isRequired,
    fetchTestList: PropTypes.func.isRequired,
    popularTags: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired,
    tests: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { tests, popularTags } = this.props
    if (!popularTags.isFetching && popularTags.items.length === 0) {
      this.props.fetchPopularTags()
    }
    if (!tests.isFetching && tests.items.length === 0) {
      console.log('dispatching fetch')
      this.props.fetchTestList()
    }
  }
  render() {
    const { isFetching, items } = this.props.tests
    const tags = this.props.popularTags
    // varianty: error stav -> globalne, loading anebo ne
    return (
      <div>
        <p>futurebreadcrumbs: {this.props.route.path}</p>
        <TestsHeader />
        {!tags.isFetching && <PopularTags tags={tags.items} />}
        {isFetching && <Loader />}
        {!isFetching && <TestsList tests={items} />}
      </div>
    )
  }
}

// todo: use reselect
const mapStateToProps = state => ({
  tests: getTestHeaders(state),
  popularTags: getPopularTags(state),
})
const mapDispatchToProps = {
  fetchPopularTags,
  fetchTestList,
}

export default connect(mapStateToProps, mapDispatchToProps)(TestsOverview)
