import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'

import Input from '../forms/Input'
import validate from './TextInputQuestionValidator'

const TextInputQuestion = ({ handleSubmit }) =>
  <Form onSubmit={handleSubmit}>
    <Field name="text" label="Znění otázky" component={Input} componentClass="textarea"/>
    <Field name="answer" label="Správná odpověď" component={Input} componentClass="textarea"/>
    <Field name="explanation" label="Krátké vysvětlení" component={Input} componentClass="textarea"/>
    <Button type="submit" bsStyle="primary">Uložit otázku</Button>
  </Form>

TextInputQuestion.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'text_input',
  validate,
})(TextInputQuestion)
