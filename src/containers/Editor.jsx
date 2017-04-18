import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser } from '../redux/testModels/tests.actions'

import { Button, Row, Col } from 'react-bootstrap'

class Editor extends Component {
  static propTypes = {
    fetchByUser: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.fetchByUser()
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
   * nadrazena komponenta muze poslouchat na /editor store metadata,
   * SIDEBAR na test fields, QUESTIONS na questionsPerTest, CONTENT krmi Editor komponenta
   */
  render() {
    return (
      <Row className="editor">
        <Col xs={4}>
          <nav className="editor__navbar">
            Hlavni udaje o testu
          </nav>
        </Col>
        <Col xs={8}>
          <Row>
            <Col xs={12} className="editor__content">
              <nav className="editor__question-bar">
                Otazky testu
              </nav>
              <div className="editor__form">
                Formular/prehled
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
const mapStateToProps = state => ({})
const mapDispatchToProps = {
  fetchByUser,
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor)
