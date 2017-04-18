import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser } from '../../redux/testModels/tests.actions'

import { Button, Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Questionsbar from './QuestionsBar'
import ContentWrapper from './ContentWrapper'

class Editor extends Component {
  static propTypes = {
    editor: PropTypes.object.isRequired,
    fetchByUser: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
  }
  componentDidMount() {
    // todo: je potreba pokud pristoupime primo na url
    // this.props.fetchByUser()
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
          <Sidebar testModelId={this.props.params.test_model_id} />
        </Col>
        <Col xs={9}>
          <Row>
            <Col xs={12} className="editor__content">
              <Questionsbar testModelId={this.props.params.test_model_id} />
              <div className="editor__form">
                <ContentWrapper editor={this.props.editor} />
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
  fetchByUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor)
