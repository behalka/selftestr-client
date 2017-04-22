import React from 'react'
import { reduxForm, Field, FieldArray, change } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip, Row, Col, Panel, Grid } from 'react-bootstrap'
import ContentForm from './ContentForm'
import Input from '../forms/Input'
import FontAwesome from 'react-fontawesome'
import texts from '../../constants/formHelpers'
import classnames from 'classnames'

import SinglechoiceAnswer from './SinglechoiceAnswer'
import validate from './ChoiceValidation'

class SinglechoiceQuestion extends ContentForm {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: null,
    }
    this.renderAnswers = this.renderAnswers.bind(this)
    this.updateSelectedAnswer = this.updateSelectedAnswer.bind(this)
  }
  updateSelectedAnswer(index) {
    this.props.dispatch(change('singlechoice', 'isCorrectGroup', index))
  }
  renderAnswers({ fields, meta }) {
    const hasError = meta.error
    const answersClasses = classnames({
      'has-error': hasError,
      'editor__answers': true,
    })    
    return (
      <div className={answersClasses}>
        <Grid fluid>
          <Row className="editor__answers__header">
            <Col xs={8} className="editor__answers__header__h">Odpovědi</Col>
            <Col xs={4}>
              <Button
                bsStyle="success"
                onClick={() => fields.push()}>
                <FontAwesome name="plus" />
                Přidat odpověď
              </Button>
            </Col>
          </Row>
        <ul className="list list--block list--no-bullets">
          {fields.map((answerModel, index) =>
            <li key={index}>
              <Panel>
                  <Row className="answer__header">
                    <div>
                      <Col xs={8} className="answer__header__h">Odpověď {index + 1}</Col>
                      <Col xs={4}>
                        <Button
                          className="answer__header__btn"
                          bsStyle="danger" onClick={() => fields.remove(index)}>
                          <FontAwesome name="trash-o" />
                          Odstranit odpověď
                        </Button>
                      </Col>
                    </div>
                  </Row>
                  <SinglechoiceAnswer
                    groupName="isCorrectGroup"
                    answerModel={answerModel}
                    index={index}
                    updateSelectedAnswer={() => this.updateSelectedAnswer(index)} />
              </Panel>
            </li>
          )}
          {hasError && <div className="help-block">{meta.error}</div>}
        </ul>
      </Grid>
    </div>
    )
  }

      // <div className={ hasError ? 'has-error' : ''}>
      //   <Button onClick={() => fields.push()}>Přidat odpověď</Button>
      // </div>
  render() {
    const { reset, handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Nastavení otázky</h3>
        <Field name="text" helper={texts.helpers.questionText} label="Znění otázky" required component={Input} componentClass="textarea"/>
        <FieldArray name="answerModels" component={this.renderAnswers} />
        <Field helper={texts.helpers.explanation} name="explanation" label="Krátké vysvětlení" component={Input} componentClass="textarea"/>

        <Button type="submit" bsStyle="success">
          <FontAwesome name="check" />
          Uložit otázku
        </Button>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="reset-btn">{texts.btns.discard}</Tooltip>}>
          <Button type="reset" bsStyle="default" onClick={reset}>
            <FontAwesome name="undo" />
            Zahodit změny
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="delete-btn">{texts.btns.delete}</Tooltip>}>
          <Button bsStyle="danger" onClick={deleteQuestionHandler}>
            <FontAwesome name="trash-o" />
            Vymazat otázku
          </Button>
        </OverlayTrigger>
      </Form>
    )
  }
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  form: 'singlechoice',
})(SinglechoiceQuestion)
