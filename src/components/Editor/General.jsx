import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import ContentForm from './ContentForm'
import Input from '../forms/Input'
import validate from './GeneralValidation'
import text from '../../constants/formHelpers'

class GeneralForm extends ContentForm {
  constructor(props) {
    super(props)
    this.state = {
      advancedPanel: false,
    }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Obecné nastavení</h3>
        <Field name="name" required label="Jméno testu" component={Input} type="text"/>
        <Field name="description" required label="Popis testu" component={Input} componentClass="textarea"/>
        <div onClick={() => this.setState({ advancedPanel: !this.state.advancedPanel })} className="collapsible__handler">
          <h3>
            <FontAwesome
              className="collapsible__icon"
              name={this.state.advancedPanel ? 'caret-down' : 'caret-right'} />
            Pokročilé nastavení
          </h3>
        </div>
        <Collapse in={this.state.advancedPanel}>
          <div>
            <Field
              name="timeLimit"
              helper={text.helpers.timeLimit}
              label="Časový limit (ve vteřinách)"
              component={Input}
              type="number"/>
            <Field
              name="questionsPerTestInstance"
              helper={text.helpers.questionsPerInstance}
              label="Počet otázek ve vygenerovaném testu"
              component={Input}
              type="number"/>
          </div>
        </Collapse>
        <Button type="submit" bsStyle="success">Uložit nastavení</Button>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="reset-btn">Nastaví zpět hodnoty podle posledního uložení.</Tooltip>}>
          <Button type="reset" bsStyle="default" onClick={this.resetAndScroll}>Zahodit změny</Button>
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
