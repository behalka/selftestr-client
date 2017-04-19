import React, { PropTypes, Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'

import Input from '../forms/Input'
import validate from './TextInputQuestionValidator'

class TextInputQuestion extends Component {
  static propTypes = {
    deleteQuestionHandler: PropTypes.func.isRequired,
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
    const { reset, handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <Field name="text" label="Znění otázky" component={Input} componentClass="textarea"/>
        <Field name="answer" label="Správná odpověď" component={Input} componentClass="textarea"/>
        <Field name="explanation" label="Krátké vysvětlení" component={Input} componentClass="textarea"/>
        <Button type="submit" bsStyle="primary">Uložit otázku</Button>
        <Button type="reset" bsStyle="default" onClick={reset}>Zahodit změny</Button>
        <Button bsStyle="danger" onClick={deleteQuestionHandler}>Vymazat otázku</Button>
      </Form>
    )
  }
}

export default reduxForm({
  form: 'text_input',
  validate,
})(TextInputQuestion)
