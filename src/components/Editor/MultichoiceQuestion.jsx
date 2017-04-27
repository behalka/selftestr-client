import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip, Panel, Grid, Row, Col } from 'react-bootstrap'
import classnames from 'classnames'
import ContentForm from './ContentForm'
import FontAwesome from 'react-fontawesome'
import texts from '../../constants/formHelpers'
import Input from '../forms/Input'
import Checkbox from '../forms/Checkbox'
import validate from './ChoiceValidation'

class MultichoiceQuestion extends ContentForm {
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
              <li key={index} className="answer">
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
                  <Row>
                    <Col xs={12}>
                      <Field
                        name={`${answerModel}.text`}
                        required
                        helper={texts.helpers.choiceAnswer}
                        label="Znění odpovědi"
                        component={Input}
                        type="text" />
                    </Col>
                    <Col xs={12}>
                      <Field
                        name={`${answerModel}.isCorrect`}
                        label="Správná odpověď"
                        component={Checkbox}
                        type="checkbox" />
                    </Col>
                  </Row>
                </Panel>
              </li>
            )}
            {hasError && <div className="help-block">{meta.error}</div>}
          </ul>
        </Grid>
      </div>
    )
  }
  render() {
    const { handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Nastavení otázky</h3>
        <Field name="text" helper={texts.helpers.questionText} required label="Znění otázky" component={Input} componentClass="textarea"/>
        <FieldArray name="answerModels" component={this.renderAnswers} />
        <Field name="explanation" helper={texts.helpers.explanation} label="Krátké vysvětlení" component={Input} componentClass="textarea"/>
        <Button type="submit" bsStyle="success">
          <FontAwesome name="check" />
          Uložit otázku
        </Button>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="reset-btn">{texts.btns.discard}</Tooltip>}>
          <Button type="reset" bsStyle="default" onClick={this.resetAndScroll}>
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
  form: 'multichoice',
})(MultichoiceQuestion)
