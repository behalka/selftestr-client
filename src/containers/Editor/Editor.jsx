import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser } from '../../redux/testModels/tests.actions'
import { clearEditor, initEditor, deleteTestFromEditor } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import { types } from '../../constants/notifications'

import { Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Questionsbar from './QuestionsBar'
import ContentWrapper from './ContentWrapper'

class Editor extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    clearEditor: PropTypes.func.isRequired,
    deleteTest: PropTypes.func.isRequired,
    editor: PropTypes.object.isRequired,
    fetchByUser: PropTypes.func.isRequired,
    initEditor: PropTypes.func.isRequired,
    modelsFetched: PropTypes.bool.isRequired,
    modelsFetching: PropTypes.bool.isRequired,
    params: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.canLeaveContent = this.canLeaveContent.bind(this)
    this.canCreateQuestions = this.canCreateQuestions.bind(this)
    this.saveAndLeave = this.saveAndLeave.bind(this)
    this.deleteTestHandler = this.deleteTestHandler.bind(this)
  }
  componentDidMount() {
    this.props.clearEditor()
    this.props.initEditor(this.props.params.test_model_id)
    if (!this.props.modelsFetched && !this.props.modelsFetching) {
      this.props.fetchByUser()
    }
  }
  saveAndLeave() {
    const { questionModelId, displayGeneralForm, isFormChanged } = this.props.editor
    // is there stuff to be saved?
    const saveQuestion = isFormChanged && questionModelId
    const saveGeneral = isFormChanged && displayGeneralForm
    if (saveQuestion || saveGeneral) {
      this.props.addNotification('Nejprve uložte formulář nebo zahoďte změny', types.WARNING)
    } else {
      this.props.router.push('/editor')
    }
  }
  canLeaveContent(callback) {
    if (!this.props.editor.isFormChanged) {
      return callback()
    }
    return this.props.addNotification('Nejprve uložte formulář nebo zahoďte změny', types.WARNING)
  }
  deleteTestHandler(testModelId) {
    this.props.deleteTest(testModelId, this.props.editor.isTestModelNew, this.props.router)
  }
  canCreateQuestions() {
    const res = !(this.props.editor.isFormChanged || this.props.editor.isTestModelNew)
    if (!res) {
      this.props.addNotification('Nejprve zadejte obecné údaje k formuláři', types.WARNING)
    }
    return res
  }
  render() {
    return (
      <Row className="editor">
        <Col xs={3}>
          <Sidebar
            testModelId={this.props.params.test_model_id}
            isFormChanged={this.props.editor.isFormChanged}
            isTestModelNew={this.props.editor.isTestModelNew}
            canCreateQuestions={this.canCreateQuestions}
            saveAndLeaveHandler={this.saveAndLeave}
            deleteTestHandler={this.deleteTestHandler}
            canLeaveContent={this.canLeaveContent} />
        </Col>
        <Col xs={9}>
          <Row>
            <Col xs={12} className="editor__content">
              <Questionsbar
                testModelId={this.props.params.test_model_id}
                isFormChanged={this.props.editor.isFormChanged}
                canLeaveContent={this.canLeaveContent} />
              <div className="editor__form">
                <ContentWrapper editor={this.props.editor} testModelId={this.props.params.test_model_id} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => ({
  editor: state.editor,
  modelsFetched: state.tests.testsOfOwner.fetched,
  modelsFetching: state.tests.testsOfOwner.fetching,
})
const mapDispatchToProps = {
  addNotification: addNotificationReq,
  deleteTest: deleteTestFromEditor,
  fetchByUser,
  clearEditor,
  initEditor,
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor)
