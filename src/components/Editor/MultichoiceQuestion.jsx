import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import ContentForm from './ContentForm'
import FontAwesome from 'react-fontawesome'
import texts from '../../constants/formHelpers'
import Input from '../forms/Input'
import Checkbox from '../forms/Checkbox'
import validate from './ChoiceValidation'

class MultichoiceQuestion extends ContentForm {
  renderAnswers({ fields, meta }) {
    const hasError = meta.error
    return (
      <div className={ hasError ? 'has-error' : ''}>
        <Button onClick={() => fields.push()}>Přidat odpověď</Button>
        <ul className="list list--block list--no-bullets">
          {fields.map((answerModel, index) =>
            <li key={index}>
              <Field name={`${answerModel}.text`} required label="Znění odpovědi" component={Input} type="text" />
              <Field name={`${answerModel}.isCorrect`} label="Je odpověď správně" component={Checkbox} type="checkbox" />
              <Button bsStyle="danger" onClick={() => fields.remove(index)}>Odstranit odpověď</Button>
            </li>
          )}
          {hasError && <div className="help-block">{meta.error}</div>}
        </ul>
      </div>
    )
  }
  render() {
    const { reset, handleSubmit, deleteQuestionHandler } = this.props
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
  form: 'multichoice',
})(MultichoiceQuestion)
