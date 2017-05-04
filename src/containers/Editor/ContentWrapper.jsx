import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getQuestionById } from '../../redux/questionModels/questionModels.selectors'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
import { saveQuestionReq, deleteQuestionReq } from '../../redux/questionModels/questionModels.actions'
import { formChanged, displayGeneral } from '../../redux/editor/editor.actions'
import { saveReq } from '../../redux/testModels/tests.actions'
import questionTypes from '../../constants/questionTypes'
import { formToQuestionModel, questionModelToForm } from '../../utils/questionModelHelper'

import ContentOverview from '../../components/Editor/ContentOverview'
import GeneralForm from '../../components/Editor/General'
import TextInputQuestion from '../../components/Editor/TextInputQuestion'
import MultichoiceQuestion from '../../components/Editor/MultichoiceQuestion'
import SinglechoiceQuestion from '../../components/Editor/SinglechoiceQuestion'


class ContentWrapper extends Component {
  static propTypes = {
    deleteQuestion: PropTypes.func.isRequired,
    displayGeneral: PropTypes.func.isRequired,
    editor: PropTypes.object,
    formChanged: PropTypes.func.isRequired,
    questionModel: PropTypes.object,
    saveGeneral: PropTypes.func.isRequired,
    saveQuestion: PropTypes.func.isRequired,
    testModel: PropTypes.object,
    testModelId: PropTypes.string.isRequired,
  }
  static defaultProps = {
    editor: {
      questionModelId: null,
    },
    testModel: null,
    questionModel: null,
  }
  constructor(props) {
    super(props)
    this.renderForm = this.renderForm.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.submitGeneralHandler = this.submitGeneralHandler.bind(this)
    this.setFormChanged = this.setFormChanged.bind(this)
    this.deleteQuestionHandler = this.deleteQuestionHandler.bind(this)
  }
  submitHandler(formData) {
    const { testModelId, isQuestionNew } = this.props.editor
    const payload = formToQuestionModel(formData)
    this.props.saveQuestion(testModelId, payload, isQuestionNew)
  }
  submitGeneralHandler(formData) {
    this.props.saveGeneral(formData, this.props.editor.isTestModelNew)
  }
  deleteQuestionHandler() {
    const { testModelId, isQuestionNew, questionModelId } = this.props.editor
    this.props.deleteQuestion(testModelId, questionModelId, isQuestionNew)
  }
  setFormChanged(isFormDirty) {
    this.props.formChanged(isFormDirty)
  }
  renderForm(data) {
    const formProps = {
      initialValues: questionModelToForm(data),
      deleteQuestionHandler: this.deleteQuestionHandler,
      setFormChanged: this.setFormChanged,
    }
    switch (data.type) {
      case questionTypes.text_input.id:
        return <TextInputQuestion {...formProps} onSubmit={this.submitHandler} />
      case questionTypes.multichoice.id:
        return <MultichoiceQuestion {...formProps} onSubmit={this.submitHandler} />
      case questionTypes.singlechoice.id:
        return <SinglechoiceQuestion {...formProps} onSubmit={this.submitHandler} />
      default:
        return <GeneralForm {...formProps} onSubmit={this.submitGeneralHandler} />
    }
  }
  render() {
    const { questionModel, testModel, editor } = this.props
    const hasModel = Boolean(testModel)
    const renderForm = editor.displayGeneralForm || Boolean(questionModel) || editor.isTestModelNew
    const renderGeneral = (editor.displayGeneralForm && hasModel) || editor.isTestModelNew
    const renderQuestion = !editor.displayGeneralForm && Boolean(questionModel) && hasModel
    const renderOverview = (!renderForm && hasModel) || editor.isTestModelNew
    // fixme: nefunguje zobrazeni formulare, flagy jsou dobre
    return (
      <div>
        {!hasModel && <span>loading</span>}
        {renderOverview && <ContentOverview
          testModel={testModel}
          isNew={editor.isTestModelNew}
          displayGeneral={this.props.displayGeneral} />}
        {renderGeneral && this.renderForm(testModel)}
        {renderQuestion && this.renderForm(questionModel)}
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  questionModel: getQuestionById(state, props.editor.questionModelId),
  testModel: getTestModelFromId(state, props.testModelId),
})
const mapDispatchToProps = {
  deleteQuestion: deleteQuestionReq,
  saveQuestion: saveQuestionReq,
  saveGeneral: saveReq,
  formChanged,
  displayGeneral,
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper)
