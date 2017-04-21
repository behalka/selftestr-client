import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import ContentForm from './ContentForm'
import Input from '../forms/Input'
import validate from './TextInputQuestionValidator'

class TextInputQuestion extends ContentForm {
  render() {
    const { reset, handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Nastavení otázky</h3>
        <Field name="text" required label="Znění otázky" component={Input} componentClass="textarea"/>
        <Field name="answer" required label="Správná odpověď" component={Input} componentClass="textarea"/>
        <Field name="explanation" label="Krátké vysvětlení" component={Input} componentClass="textarea"/>
        <Button type="submit" bsStyle="success">Uložit otázku</Button>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="reset-btn">Nastaví zpět hodnoty podle posledního uložení.</Tooltip>}>
          <Button type="reset" bsStyle="default" onClick={reset}>Zahodit změny</Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="delete-btn">Nenávratně vymaže otázku a odpovědi.</Tooltip>}>
          <Button bsStyle="danger" onClick={deleteQuestionHandler}>Vymazat otázku</Button>
        </OverlayTrigger>
      </Form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'text_input',
  validate,
})(TextInputQuestion)
