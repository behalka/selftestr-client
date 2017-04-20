import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'

import ContentForm from './ContentForm'
import Input from '../forms/Input'
import validate from './GeneralValidation'

class GeneralForm extends ContentForm {
  render() {
    const { reset, handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Obecné nastavení</h3>
        <Field name="name" label="Jméno testu" component={Input} type="text"/>
        <Field name="description" label="Popis testu" component={Input} componentClass="textarea"/>
        <Field name="timeLimit" label="Časový limit (ve vteřinách)" component={Input} type="number"/>
        <Field name="questionsPerTestInstance" label="Počet otázek ve vygenerovaném testu" component={Input} type="number"/>
        <Button type="submit" bsStyle="success">Uložit nastavení</Button>
        <Button type="reset" bsStyle="default" onClick={reset}>Zahodit změny</Button>
      </Form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'general',
  validate,
})(GeneralForm)
