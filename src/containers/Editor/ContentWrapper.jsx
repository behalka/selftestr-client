import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getQuestionById } from '../../redux/questionModels/questionModels.selectors'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
import { saveQuestionReq, deleteQuestionReq } from '../../redux/questionModels/questionModels.actions'
import { formChanged, displayGeneral } from '../../redux/editor/editor.actions'
import { saveReq } from '../../redux/testModels/tests.actions'
import questionTypes from '../../constants/questionTypes'

import ContentOverview from '../../components/Editor/ContentOverview'
import GeneralForm from '../../components/Editor/General'
import TextInputQuestion from '../../components/Editor/TextInputQuestion'

// todo: nekam do utils - volat z sag
// todo: mozna dalsi funkce - init tech modelu
function questionModelToForm(model) {
  const formData = {}
  if (!model.type) {
    // jedna se o general form!
    return Object.assign(formData, model)
  }
  switch (model.type) {
    case questionTypes.TEXT_INPUT:
      if (model.answerModels.length > 0) {
        formData.answer = model.answerModels[0].correctSolution
      }
      return Object.assign(formData, model)
    default:
      console.log('failed mapping to form')
  }
}

function formToQuestionModel(formData) {
  const questionModel = Object.assign({}, formData)
  switch (formData.type) {
    case questionTypes.TEXT_INPUT:
      const correctAnswer = formData.answer
      if (questionModel.answerModels.length > 0) {
        // nemohlo to byt v databazi pokud tohle chybi
        if (!questionModel.answerModels[0].isCorrect) {
          questionModel.answerModels[0].isCorrect = true
        }
        questionModel.answerModels = questionModel.answerModels
          .setIn(['0', 'correctSolution'], correctAnswer)
      } else {
        questionModel.answerModels = questionModel.answerModels.concat({
          isCorrect: true,
          correctSolution: correctAnswer,
        })
      }
      delete questionModel.answer
      return questionModel
    default:
      console.log('failed mapping to model')
  }
}

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
    // sdilene form properties
    const formProps = {
      initialValues: questionModelToForm(data),
      enableReinitialize: true,
      deleteQuestionHandler: this.deleteQuestionHandler,
      setFormChanged: this.setFormChanged,
    }
    switch (data.type) {
      case questionTypes.TEXT_INPUT:
        return <TextInputQuestion {...formProps} onSubmit={this.submitHandler} />
      default:
        return <GeneralForm {...formProps} onSubmit={this.submitGeneralHandler} />
    }
  }
  render() {
    const { questionModel, testModel, editor } = this.props
    const renderForm = editor.displayGeneralForm || Boolean(questionModel)
    return (
      <div>
        {renderForm && editor.displayGeneralForm && this.renderForm(testModel)}
        {renderForm && !editor.displayGeneralForm && this.renderForm(questionModel)}
        {!renderForm && <ContentOverview
          testModel={testModel}
          isNew={editor.isTestModelNew}
          displayGeneral={this.props.displayGeneral} />}
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
