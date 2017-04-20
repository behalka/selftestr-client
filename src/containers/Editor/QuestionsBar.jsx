import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { getQuestionsByTest } from '../../redux/questionModels/questionModels.selectors'
import { selectQuestion } from '../../redux/editor/editor.actions'
import { Button } from 'react-bootstrap'

class QuestionsBar extends Component {
  static propTypes = {
    canLeaveContent: PropTypes.func.isRequired,
    isFormChanged: PropTypes.bool.isRequired,
    questions: PropTypes.array,
    selectedQuestion: PropTypes.string,
    selectQuestion: PropTypes.func.isRequired,
    testModelId: PropTypes.string.isRequired,
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
    this.props.canLeaveContent(this.props.selectQuestion.bind(this, question.id))
  }
  render() {
    /*
     * todo: vyresit disabled zvolene otazky vic elegantne
     *  -> idealne odstranit odkaz a upravit vzhled
     */
    const { isFormChanged, selectedQuestion } = this.props
    return (
      <nav className="editor__question-bar">
        {this.props.questions.length === 0
          && <div className="editor__question-bar--empty">
          Test zatím neobsahuje žádné otázky.
          </div>}
        {this.props.questions.map((question, index) =>
          <Button bsSize="large"
            key={question.id}
            className={
              classnames({
                'editor__question': true,
                'disabled': isFormChanged && selectedQuestion !== question.id,
                'editor__question--selected disabled': selectedQuestion === question.id,
              })
            }
            onClick={() => this.questionSelectedHandler(question)}>
            {index + 1}
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
