import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser, createTestReq, deleteTestReq } from '../../redux/testModels/tests.actions'
import { initEditor } from '../../redux/editor/editor.actions'
import { getTestsByOwner } from '../../redux/testModels/tests.selectors'
import { Button } from 'react-bootstrap'

import Loader from '../../components/layout/Loader'
import EditorOverviewComponent from '../../components/Editor/Overview'

class EditorOverview extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    createTest: PropTypes.func.isRequired,
    deleteTest: PropTypes.func.isRequired,
    fetchByUser: PropTypes.func.isRequired,
    initEditor: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    testModels: PropTypes.object,
  }
  static defaultProps = {
    testModels: {
      isFetching: false,
      fetched: false,
      items: [],
    },
  }
  constructor(props) {
    super(props)
    this.createTestHandler = this.createTestHandler.bind(this)
    this.editTestHandler = this.editTestHandler.bind(this)
    this.deleteTestHandler = this.deleteTestHandler.bind(this)
  }
  componentDidMount() {
    const { testModels } = this.props
    // todo: stav, kdy uzivatel nema zadne testy!
    if (!testModels.fetched && !testModels.isFetching) {
      this.props.fetchByUser()
    }
  }
  createTestHandler() {
    this.props.createTest(this.props.router)
  }
  editTestHandler(testModelId) {
    this.props.router.push(`/editor/${testModelId}`)
  }
  deleteTestHandler(testModelId) {
    this.props.deleteTest(testModelId)
  }
  render() {
    const { testModels } = this.props
    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.createTestHandler}>Vytvořit nový test</Button>
        {testModels.isFetching && <Loader />}
        {!testModels.isFetching
          && <EditorOverviewComponent
              testModels={testModels.items}
              deleteTestHandler={this.deleteTestHandler}
              editTestHandler={this.editTestHandler} />}
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  testModels: getTestsByOwner(state, props),
})
const mapDispatchToProps = {
  fetchByUser,
  initEditor,
  deleteTest: deleteTestReq,
  createTest: createTestReq,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorOverview)
