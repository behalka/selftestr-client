import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getQuestionsByTest } from '../../redux/questionModels/questionModels.selectors'
import { selectQuestion } from '../../redux/editor/editor.actions'
// import { fetchByUser } from '../redux/testModels/tests.actions'
import { Button, Row, Col } from 'react-bootstrap'

class QuestionsBar extends Component {
  static propTypes = {
    questions: PropTypes.array,
    selectedQuestion: PropTypes.string,
    selectQuestion: PropTypes.func.isRequired,
    testModelId: PropTypes.string.isRequired,
    // todo: dispatch functions
  }
  static defaultProps = {
    questions: [],
    selectedQuestion: null,
  }
  constructor(props) {
    super(props)
    this.questionSelectedHandler = this.questionSelectedHandler.bind(this)
  }
  questionSelectedHandler(question) {
    this.props.selectQuestion(question.id)
  }
  render() {
    return (
      <nav className="editor__question-bar">
        {this.props.questions.map((question, index) =>
          <Button bsSize="large"
            key={question.id}
            className={this.props.selectedQuestion === question.id
              ? 'editor__question--selected editor__question'
              : 'editor__question'}
            onClick={() => this.questionSelectedHandler(question)}>
            {index}
          </Button>
          )}
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => ({
  questions: getQuestionsByTest(state, props.testModelId),
  selectedQuestion: state.editor.questionModelId,
})
const mapDispatchToProps = {
  selectQuestion,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsBar)
