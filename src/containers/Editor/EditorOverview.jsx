import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser, createTestReq, deleteTestReq } from '../../redux/testModels/tests.actions'
import { initEditor, selectTestModel } from '../../redux/editor/editor.actions'
import { getTestsByOwner } from '../../redux/testModels/tests.selectors'
import { Button } from 'react-bootstrap'

import Modal from '../../components/Modal/Modal'
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
    selectTest: PropTypes.func.isRequired,
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
    this.createModal = this.createModal.bind(this)
    this.initModal = this.initModal.bind(this)
    this.state = {
      deleteModal: false,
      modals: null,
    }
  }
  componentDidMount() {
    const { testModels } = this.props
    if (!testModels.fetched && !testModels.isFetching) {
      this.props.fetchByUser()
    }
  }
  createTestHandler() {
    this.props.createTest(this.props.router)
  }
  editTestHandler(testModelId) {
    this.props.selectTest(testModelId)
    this.props.router.push(`/editor/${testModelId}`)
  }
  deleteTestHandler(testModelId) {
    this.props.deleteTest(testModelId)
  }
  createModal(testModelId, testModelName, selectedModal) {
    const modalProps = {
      submitHandler: this.deleteTestHandler.bind(this, testModelId),
      title: `Opravdu chcete smazat celý test "${testModelName}" se všemi otázkami?`,
      body: 'Tato akce je nevratná.',
      btnStyle: 'danger',
      isOpened: testModelId === selectedModal,
    }
    return <Modal {...modalProps} />
  }
  initModal(testModelId) {
    this.setState({
      modals: testModelId,
    })
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
              createModal={this.createModal}
              initModal={this.initModal}
              selectedModal={this.state.modals}
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
  selectTest: selectTestModel,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorOverview)
