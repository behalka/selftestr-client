import React, { PropTypes, Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'

import Input from '../forms/Input'
import validate from './GeneralValidation'

class GeneralForm extends Component {
  static propTypes = {
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setFormChanged: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      formUpdated: false,
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.dirty !== this.state.formUpdated) {
      this.setState({ formUpdated: newProps.dirty })
      this.props.setFormChanged(newProps.dirty)
    }
  }
  render() {
    const { reset, handleSubmit } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Obecné nastavení</h3>
        <Field name="name" label="Jméno testu" component={Input} type="text"/>
        <Field name="description" label="Popis testu" component={Input} componentClass="textarea"/>
        <Field name="timeLimit" label="Časový limit (ve vteřinách)" component={Input} type="number"/>
        <Field name="questionsPerTestInstance" label="Počet otázek ve vygenerovaném testu" component={Input} type="number"/>
        <Button type="submit" bsStyle="success">Uložit otázku</Button>
        <Button type="reset" bsStyle="default" onClick={reset}>Zahodit změny</Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'general',
  validate,
})(GeneralForm)
