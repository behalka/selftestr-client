import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
import classnames from 'classnames'
import { Button, Row, Col } from 'react-bootstrap'
import { reset } from 'redux-form'
import { createQuestionReq } from '../../redux/questionModels/questionModels.actions'
import { displayGeneral, clearForm } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import { types } from '../../constants/notifications'

import LimitedText from '../../components/LimitedText/LimitedText'
import QuestionSelect from '../../components/Editor/QuestionSelect'

class EditorSidebar extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    canCreateQuestions: PropTypes.func.isRequired,
    canLeaveContent: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    displayGeneral: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    selectedQuestion: PropTypes.string,
    testDetail: PropTypes.object,
    testModelId: PropTypes.string.isRequired,
    // saveHandler: PropTypes.func,
    // leaveHandler: PropTypes.func,
  }
  static defaultProps = {
    testDetail: {
      name: 'Jméno testu není zadané',
      description: 'Popis není zadaný',
    },
    selectedQuestion: null,
  }
  constructor(props) {
    super(props)
    this.addQuestionHandler = this.addQuestionHandler.bind(this)
    this.editGeneralHandler = this.editGeneralHandler.bind(this)
    this.displayOverview = this.displayOverview.bind(this)
    this.selectQuestionType = this.selectQuestionType.bind(this)
  }
  addQuestionHandler(questionType) {
    console.log('vytvorit otazku typu', questionType)
    const data = {
      type: 'text_input',
    }
    this.props.canLeaveContent(this.props.createQuestion.bind(this, this.props.testModelId, data))
  }
  editGeneralHandler() {
    this.props.canLeaveContent(this.props.displayGeneral)
  }
  displayOverview(event) {
    if (event) {
      event.preventDefault()
    }
    this.props.canLeaveContent(this.props.clearForm)
  }
  selectQuestionType(formData) {
    if (this.props.canCreateQuestions()) {
      const questionType = formData.type
      this.addQuestionHandler(questionType)
    }
    this.props.reset('questionSelect')
  }
  render() {
    const { testDetail, isFormChanged } = this.props
    const disabledClass = classnames({
      disabled: isFormChanged,
    })
    const sidebarBtnClass = classnames({
      'test-model__control': true,
    })
    return (
      <nav className="editor__navbar">
        <a className="test-model__name" onClick={this.displayOverview} href="#">
            {testDetail.name || EditorSidebar.defaultProps.testDetail.name}
        </a>
        <LimitedText
          classes="test-model__desc"
          input={testDetail.description || EditorSidebar.defaultProps.testDetail.description}
          limit={60} />
        <QuestionSelect options={[
          { value: 'foo', text: 'bar' },
          { value: 'foo1', text: 'ba1r' },
        ]}
        onSubmit={this.selectQuestionType}
        buttonClasses={classnames(sidebarBtnClass, disabledClass)}
        />
        <div className="test-model__controls">
          <Button
            block
            className={classnames(sidebarBtnClass, disabledClass)}
            onClick={this.editGeneralHandler}>
            Editovat test
          </Button>
          <Button
            block
            className={classnames(sidebarBtnClass, disabledClass)}
            onClick={this.displayOverview}>Zobrazit přehled</Button>
          <Button block
            className={sidebarBtnClass}
            bsStyle="primary">Uložit test</Button>
          <Button block
            className={sidebarBtnClass}
            bsStyle="danger">Smazat test</Button>
          <Button
            className={sidebarBtnClass}
            block>Opustit editor</Button>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => ({
  testDetail: getTestModelFromId(state, props.testModelId),
  selectedQuestion: state.editor.questionModelId,
})
const mapDispatchToProps = {
  addNotification: addNotificationReq,
  createQuestion: createQuestionReq,
  displayGeneral,
  clearForm,
  reset,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorSidebar)
