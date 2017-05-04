import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
import { reset } from 'redux-form'
import { createQuestionReq } from '../../redux/questionModels/questionModels.actions'
import { displayGeneral, clearForm } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import questionTypes from '../../constants/questionTypes'

import classnames from 'classnames'
import ControlButton from '../../components/Editor/ControlButton'
import Modal from '../../components/Modal/Modal'
import LimitedText from '../../components/LimitedText/LimitedText'
import QuestionSelect from '../../components/Editor/QuestionSelect'

class EditorSidebar extends Component {
  static propTypes = {
    canCreateQuestions: PropTypes.func.isRequired,
    canLeaveContent: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    deleteTestHandler: PropTypes.func.isRequired,
    displayGeneral: PropTypes.func.isRequired,
    isFormChanged: PropTypes.bool,
    isTestModelNew: PropTypes.bool,
    reset: PropTypes.func.isRequired,
    saveAndLeaveHandler: PropTypes.func.isRequired,
    testDetail: PropTypes.object,
    testModelId: PropTypes.string.isRequired,
  }
  static defaultProps = {
    testDetail: {
      name: 'Jméno testu není zadané',
      description: 'Popis není zadaný',
    },
    isFormChanged: false,
    isTestModelNew: false,
    selectedQuestion: null,
  }
  constructor(props) {
    super(props)
    this.addQuestionHandler = this.addQuestionHandler.bind(this)
    this.editGeneralHandler = this.editGeneralHandler.bind(this)
    this.displayOverview = this.displayOverview.bind(this)
    this.selectQuestionType = this.selectQuestionType.bind(this)
    this.createModal = this.createModal.bind(this)
    this.state = {
      deleteModal: false,
    }
  }
  addQuestionHandler(questionType) {
    console.log('vytvorit otazku typu', questionType)
    const data = {
      type: questionType,
    }
    this.props.canLeaveContent(this.props.createQuestion.bind(this, this.props.testModelId, data))
  }
  editGeneralHandler(event) {
    if (event) {
      event.preventDefault()
    }
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
  createModal(properties, stateParam) {
    return <Modal {...properties} isOpened={this.state[stateParam]} />
  }
  render() {
    const { testDetail, isFormChanged } = this.props
    const disabledClass = classnames({
      disabled: isFormChanged,
    })
    const sidebarBtnClass = classnames({
      'test-model__control': true,
    })
    const deleteTestModal = this.createModal({
      submitHandler: this.props.deleteTestHandler.bind(this, testDetail.id),
      title: 'Opravdu chcete smazat celý test se všemi otázkami?',
      body: 'Tato akce je nevratná.',
      btnStyle: 'danger',
    }, 'deleteModal')
    return (
      <nav className="editor__navbar">
        {deleteTestModal}
        <a className="test-model__name" onClick={
          this.props.isTestModelNew
          ? this.editGeneralHandler
          : this.displayOverview} href="#">
            {testDetail.name || EditorSidebar.defaultProps.testDetail.name}
        </a>
        <LimitedText
          classes="test-model__desc"
          input={testDetail.description || EditorSidebar.defaultProps.testDetail.description}
          limit={120} />
        <QuestionSelect options={
          Object.keys(questionTypes).map(key => ({
            value: questionTypes[key].id, text: questionTypes[key].name,
          }))
        }
        onSubmit={this.selectQuestionType}
        buttonClasses={classnames(sidebarBtnClass, disabledClass)}
        />
        <div className="test-model__controls">
          <ControlButton
            submitHandler={this.editGeneralHandler}
            isDisabled={isFormChanged}
            content="Upravit nastavení testu"
            iconName="pencil"
            bsStyle="primary"
          />
          <ControlButton
            submitHandler={this.displayOverview}
            iconName="list-alt"
            content="Přehled testu"
            isDisabled={isFormChanged}
          />
          <ControlButton
            submitHandler={this.props.saveAndLeaveHandler}
            iconName="arrow-left"
            content="Opustit test"
            isDisabled={isFormChanged}
          />
          <ControlButton
            submitHandler={() => this.setState({ deleteModal: true })}
            iconName="trash-o"
            content="Smazat test"
            isDisabled={false}
            bsStyle="danger"
          />
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
