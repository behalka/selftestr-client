import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getQuestionById } from '../../redux/questionModels/questionModels.selectors'

import TextInputQuestion from '../../components/Editor/TextInputQuestion'

class ContentWrapper extends Component {
  static propTypes = {
    editor: PropTypes.object,
    questionModel: PropTypes.object,
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
    console.log(formData)
  }
  renderForm(data) {
    console.log(data)
    // sdilene form properties
    // todo: initialData - hlavne odpovedi se mozna budou muset nastavovat taky podle tipu otazky tak aby
    // sedely do formulare - a potom musi sedet pro request na API
    const formProps = {
      initialValues: data,
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
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(ContentWrapper)
