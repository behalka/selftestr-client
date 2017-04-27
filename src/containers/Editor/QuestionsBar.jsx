import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { getQuestionsByTest } from '../../redux/questionModels/questionModels.selectors'
import { selectQuestion } from '../../redux/editor/editor.actions'
import { Button } from 'react-bootstrap'

const QUESTIONS_PER_PAGE = 10

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
    this.moveToPage = this.moveToPage.bind(this)
    this.buildPagination = this.buildPagination.bind(this)
    this.state = {
      page: 0,
    }
  }
  moveToPage(page) {
    this.setState({ page })
  }
  questionSelectedHandler(question) {
    this.props.canLeaveContent(this.props.selectQuestion.bind(this, question.id))
  }
  buildPagination(questions) {
    const pages = Math.ceil(questions.length / QUESTIONS_PER_PAGE)
    const paginateBtns = []
    for (let i = 0; i < pages; i++) {
      const classes = classnames({
        'editor__question': true,
        'editor__question--selected': (i === this.state.page) && this.props.selectedQuestion,
        'disabled': (i === this.state.page) && this.props.selectedQuestion,
      })
      const lower = (i * QUESTIONS_PER_PAGE) + 1
      const upper = (i + 1) * QUESTIONS_PER_PAGE
      paginateBtns
        .push(
          <Button
            className={classes}
            onClick={() => this.moveToPage(i)}
            bsSize="large">{`${lower} - ${upper}`}
          </Button>)
    }
    return paginateBtns
  }
  render() {
    const { isFormChanged, selectedQuestion, questions } = this.props
    const pages = this.buildPagination(questions)
    const lower = this.state.page * QUESTIONS_PER_PAGE
    const upper = (this.state.page + 1) * QUESTIONS_PER_PAGE
    const paginatedQuestions = questions
      .slice(lower, upper)
    return (
      <nav className="editor__question-bar">
        <div className="editor__question-header">Testové otázky</div>
        {questions.length === 0
          && <div className="editor__question-bar--empty">
          Test zatím neobsahuje žádné otázky.
          </div>}
        {questions.length !== 0
          && <div>
            <div className="editor__questions">
              {paginatedQuestions.map((question, index) =>
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
                  {(this.state.page * QUESTIONS_PER_PAGE) + index + 1}
                </Button>
                )}
            </div>
            {questions.length > QUESTIONS_PER_PAGE &&
              <div className="editor__pagination">
                {pages}
              </div>
            }
          </div>
        }
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
