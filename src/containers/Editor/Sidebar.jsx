import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
// import { fetchByUser } from '../redux/testModels/tests.actions'
import { createQuestionReq } from '../../redux/questionModels/questionModels.actions'
import { displayGeneral } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import { types } from '../../constants/notifications'
import classnames from 'classnames'
import { Button, Row, Col } from 'react-bootstrap'

class EditorSidebar extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    createQuestion: PropTypes.func.isRequired,
    displayGeneral: PropTypes.func.isRequired,
    isFormChanged: PropTypes.bool,
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
    isFormChanged: false,
  }
  constructor(props) {
    super(props)
    this.addQuestionHandler = this.addQuestionHandler.bind(this)
    this.editGeneralHandler = this.editGeneralHandler.bind(this)
  }
  addQuestionHandler() {
    // fixme: tohle bude z formulare
    const data = {
      type: 'text_input',
    }
    this.props.createQuestion(this.props.testModelId, data)
  }
  editGeneralHandler() {
    // todo: kontrola jestli to muzeme zobrazit
    const { isFormChanged, selectedQuestion } = this.props
    if (!isFormChanged) {
      this.props.displayGeneral()
    } else {
      this.props.addNotification('Nejprve uložte formulář nebo zahoďte změny', types.WARNING)
    }
  }
  render() {
    const { testDetail, isFormChanged } = this.props
    return (
      <nav className="editor__navbar">
        <h1 className="test-model__name">
          {testDetail.name}
        </h1>
        <div className="test-model__desc">
          {testDetail.description}
        </div>
        <Button
          className={classnames({
            disabled: isFormChanged,
          })}
          onClick={this.editGeneralHandler}>
          Editovat test
        </Button>
        <Button onClick={this.addQuestionHandler}>Přidat otázku</Button>
        <Button bsStyle="primary">Uložit test</Button>
        <Button bsStyle="danger">Smazat test</Button>
        <Button>Opustit editor</Button>
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => ({
  testDetail: getTestModelFromId(state, props.testModelId),
  selectedQuestion: state.editor.questionModelId,
  isFormChanged: state.editor.isFormChanged,
})
const mapDispatchToProps = {
  addNotification: addNotificationReq,
  createQuestion: createQuestionReq,
  displayGeneral,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorSidebar)
