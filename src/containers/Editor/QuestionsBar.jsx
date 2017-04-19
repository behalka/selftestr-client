import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { getQuestionsByTest } from '../../redux/questionModels/questionModels.selectors'
import { selectQuestion } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import { types } from '../../constants/notifications'
// import { fetchByUser } from '../redux/testModels/tests.actions'
import { Button, Row, Col } from 'react-bootstrap'

class QuestionsBar extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
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
    if (this.props.isFormChanged) {
      this.props.addNotification('Nejprve uložte otázku nebo zahoďte změny', types.WARNING)
    } else if (this.props.selectedQuestion !== question.id) {
      this.props.selectQuestion(question.id)
    } else {
      console.log('already there!')
    }
  }
  render() {
    /*
     * todo: vyresit disabled zvolene otazky vic elegantne
     *  -> idealne odstranit odkaz a upravit vzhled
     */
    const { isFormChanged, selectedQuestion } = this.props
    return (
      <nav className="editor__question-bar">
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
  isFormChanged: state.editor.isFormChanged,
})
const mapDispatchToProps = {
  addNotification: addNotificationReq,
  selectQuestion,
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsBar)
