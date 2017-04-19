import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getQuestionById } from '../../redux/questionModels/questionModels.selectors'
import { saveQuestionReq } from '../../redux/questionModels/questionModels.actions'
import TextInputQuestion from '../../components/Editor/TextInputQuestion'
import questionTypes from '../../constants/questionTypes'

// todo: nekam do utils - volat z sag
// todo: mozna dalsi funkce - init tech modelu
function questionModelToForm(questionModel) {
  const formData = {}
  switch (questionModel.type) {
    case questionTypes.TEXT_INPUT:
      if (questionModel.answerModels.length > 0) {
        formData.answer = questionModel.answerModels[0].correctSolution
      }
      return Object.assign(formData, questionModel)
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
    editor: PropTypes.object,
    questionModel: PropTypes.object,
    saveQuestion: PropTypes.func.isRequired,
  }
  static defaultProps = {
    editor: {
      questionModelId: null,
    },
    questionModel: null,
  }
  constructor(props) {
    super(props)
    this.renderForm = this.renderForm.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(formData) {
    const { testModelId, isQuestionNew } = this.props.editor
    const payload = formToQuestionModel(formData)
    this.props.saveQuestion(testModelId, payload, isQuestionNew)
  }
  renderForm(data) {
    // sdilene form properties
    // todo: initialData - hlavne odpovedi se mozna budou muset nastavovat taky podle tipu otazky tak aby
    // sedely do formulare - a potom musi sedet pro request na API
    // bud unikatni submity, nebo switch v jednom submitu
    const formProps = {
      initialValues: questionModelToForm(data),
      onSubmit: this.submitHandler,
      enableReinitialize: true,
    }
    return <TextInputQuestion {...formProps} />
  }
  render() {
    const { questionModel } = this.props
    // todo: zobrazit formular na zaklade udaju v editor
    const renderQuestion = Boolean(questionModel)
    return (
      <div>
        {this.props.editor.questionModelId || 'je to null'}
        {renderQuestion && this.renderForm(questionModel)}
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  questionModel: getQuestionById(state, props.editor.questionModelId),
})
const mapDispatchToProps = {
  saveQuestion: saveQuestionReq,
}
export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper)
