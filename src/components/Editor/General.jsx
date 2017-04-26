import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

import ContentForm from './ContentForm'
import Input from '../forms/Input'
import validate from './GeneralValidation'
import text from '../../constants/formHelpers'

class GeneralForm extends ContentForm {
  render() {
    const { reset, handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Obecné nastavení</h3>
        <Field name="name" required label="Jméno testu" component={Input} type="text"/>
        <Field name="description" required label="Popis testu" component={Input} componentClass="textarea"/>
        <Field name="timeLimit" helper={text.helpers.timeLimit} label="Časový limit (ve vteřinách)" component={Input} type="number"/>
        <Field name="questionsPerTestInstance" helper={text.helpers.questionsPerInstance} required label="Počet otázek ve vygenerovaném testu" component={Input} type="number"/>
        <Button type="submit" bsStyle="success">Uložit nastavení</Button>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="reset-btn">Nastaví zpět hodnoty podle posledního uložení.</Tooltip>}>
          <Button type="reset" bsStyle="default" onClick={reset}>Zahodit změny</Button>
        </OverlayTrigger>
      </Form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'general',
  validate,
})(GeneralForm)
