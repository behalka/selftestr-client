import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'

import ContentForm from './ContentForm'
import Input from '../forms/Input'
import validate from './TextInputQuestionValidator'

class TextInputQuestion extends ContentForm {
  render() {
    const { reset, handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Nastavení otázky</h3>
        <Field name="text" label="Znění otázky" component={Input} componentClass="textarea"/>
        <Field name="answer" label="Správná odpověď" component={Input} componentClass="textarea"/>
        <Field name="explanation" label="Krátké vysvětlení" component={Input} componentClass="textarea"/>
        <Button type="submit" bsStyle="success">Uložit otázku</Button>
        <Button type="reset" bsStyle="default" onClick={reset}>Zahodit změny</Button>
        <Button bsStyle="danger" onClick={deleteQuestionHandler}>Vymazat otázku</Button>
      </Form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'text_input',
  validate,
})(TextInputQuestion)
