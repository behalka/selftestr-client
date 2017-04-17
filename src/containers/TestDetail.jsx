import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchTestById } from '../redux/testModels/tests.actions'
import { getTestFromParams } from '../redux/testModels/tests.selectors'
import { getAuth } from '../redux/auth/auth.selectors'
import { addCommentReq } from '../redux/comments/comments.actions'

import TestDetailContainer from '../components/TestDetail/TestDetail'
import Loader from '../components/layout/Loader'

class TestDetail extends Component {
  static defaultProps = {
    test: null,
  }
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    fetchTestById: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    test: PropTypes.object,
  }
  constructor(props) {
    super(props)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
  }
  componentDidMount() {
    const { test_id: testId } = this.props.params
    // todo: nebo chybi detail
    if (!this.props.test) {
      this.props.fetchTestById(testId)
    }
  }
  handleCommentSubmit(data) {
    console.log(this.props.test)
    const author = {
      id: this.props.auth.user.id,
      username: this.props.auth.user.username,
    }
    this.props.addComment(data.comment, author, this.props.test.id)
  }
  render() {
    const { test } = this.props
    return (
      <div>
        {!test && <Loader />}
        {test && <TestDetailContainer
                    test={test}
                    user={this.props.auth}
                    handleSubmit={this.handleCommentSubmit}
                  />
        }
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  test: getTestFromParams(state, props),
  auth: getAuth(state),
})
const mapDispatchToProps = {
  addComment: addCommentReq,
  fetchTestById,
}

export default connect(mapStateToProps, mapDispatchToProps)(TestDetail)
