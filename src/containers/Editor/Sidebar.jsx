import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
// import { fetchByUser } from '../redux/testModels/tests.actions'
import { createQuestionReq } from '../../redux/questionModels/questionModels.actions'
import { displayGeneral, clearForm } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import { types } from '../../constants/notifications'
import classnames from 'classnames'
import { Button, Row, Col } from 'react-bootstrap'
import LimitedText from '../../components/LimitedText/LimitedText'

class EditorSidebar extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    clearForm: PropTypes.func.isRequired,
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
    this.displayOverview = this.displayOverview.bind(this)
  }
  addQuestionHandler() {
    // fixme: tohle bude z formulare
    const data = {
      type: 'text_input',
    }
    this.props.createQuestion(this.props.testModelId, data)
  }
  editGeneralHandler() {
    const { isFormChanged } = this.props
    if (!isFormChanged) {
      this.props.displayGeneral()
    } else {
      this.props.addNotification('Nejprve uložte formulář nebo zahoďte změny', types.WARNING)
    }
  }
  displayOverview(event) {
    const { isFormChanged } = this.props
    if (event) {
      event.preventDefault()
    }
    if (!isFormChanged) {
      this.props.clearForm()
    } else {
      this.props.addNotification('Nejprve uložte formulář nebo zahoďte změny', types.WARNING)
    }
  }
  render() {
    const { testDetail, isFormChanged } = this.props
    const disabledClass = classnames({
      disabled: isFormChanged,
    })
    const sidebarBtnClass = classnames({
      'test-model__control': true,
    })
    return (
      <nav className="editor__navbar">
        <a className="test-model__name" onClick={this.displayOverview} href="#">
            {testDetail.name}
        </a>
        <LimitedText classes="test-model__desc" input={testDetail.description} limit={60} />
        <Button
          block
          className={classnames(sidebarBtnClass, disabledClass)}
          onClick={this.editGeneralHandler}>
          Editovat test
        </Button>
        <Button
          block
          className={classnames(sidebarBtnClass, disabledClass)}
          onClick={this.addQuestionHandler}>Přidat otázku</Button>
        <Button
          block
          className={classnames(sidebarBtnClass, disabledClass)}
          onClick={this.displayOverview}>Zobrazit přehled</Button>
        <Button block
          className={sidebarBtnClass}
          bsStyle="primary">Uložit test</Button>
        <Button block
          className={sidebarBtnClass}
          bsStyle="danger">Smazat test</Button>
        <Button
          className={sidebarBtnClass}
          block>Opustit editor</Button>
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
  clearForm,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorSidebar)
