import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser } from '../../redux/testModels/tests.actions'
import { clearEditor, initEditor } from '../../redux/editor/editor.actions'
import { addNotificationReq } from '../../redux/appState/appState.actions'
import { types } from '../../constants/notifications'

import { Button, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Questionsbar from './QuestionsBar'
import ContentWrapper from './ContentWrapper'

class Editor extends Component {
  static propTypes = {
    addNotification: PropTypes.func.isRequired,
    clearEditor: PropTypes.func.isRequired,
    editor: PropTypes.object.isRequired,
    fetchByUser: PropTypes.func.isRequired,
    initEditor: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.canLeaveContent = this.canLeaveContent.bind(this)
  }
  componentDidMount() {
    this.props.clearEditor()
    this.props.initEditor(this.props.params.test_model_id)
    // this.props.fetchByUser()
  }
  canLeaveContent(callback) {
    if (!this.props.editor.isFormChanged) {
      return callback()
    }
    return this.props.addNotification('Nejprve uložte formulář nebo zahoďte změny', types.WARNING)
  }
  /*
   * bude nutny nejak vyresit zvlastni "current test" kus v store
   * asi neni nutny to kopirovat, jen treba dat flag "isEdited" do testsWithQuestions
   * ID testu se muze brat z URL vzdy
   * metody na editaci/vytvoreni/smazani otazky
   * metody na editaci obecnych parametru
   * SIDEBAR nav - handlery, detail testu
   * QUESTIONS - ciste otazky a nejake isSelected .. tyhle meta informace by mohly byt nekde zvlast
   * CONTENT - formular prislusny nebo prehled ... asi muze dostavat veci od nekoho ciste..
   *  - otazka jde ULOZIT nebo ZRUSIT
   *  - tohle se bude krmit samo nebo od Editoru, zalezi na redux-forms spis
   * nadrazena komponenta muze poslouchat na /editor store metadata,
   * SIDEBAR na test fields, QUESTIONS na questionsPerTest, CONTENT krmi Editor komponenta
   */
  render() {
    return (
      <Row className="editor">
        <Col xs={3}>
          <Sidebar
            testModelId={this.props.params.test_model_id}
            isFormChanged={this.props.editor.isFormChanged}
            canLeaveContent={this.canLeaveContent} />
        </Col>
        <Col xs={9}>
          <Row>
            <Col xs={12} className="editor__content">
              <Questionsbar
                testModelId={this.props.params.test_model_id}
                isFormChanged={this.props.editor.isFormChanged}
                canLeaveContent={this.canLeaveContent} />
              <div className="editor__form">
                <ContentWrapper editor={this.props.editor} testModelId={this.props.params.test_model_id} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => ({
  editor: state.editor,
})
const mapDispatchToProps = {
  addNotification: addNotificationReq,
  fetchByUser,
  clearEditor,
  initEditor,
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor)
