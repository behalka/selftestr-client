import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
// import { FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import Input from './Input'

const Login = ({ handleSubmit }) =>
  <Form onSubmit={handleSubmit}>
    <Field name="username" label="Uživatelské jméno" component={Input} type="text" />
    <Field name="password" label="Heslo" component={Input} type="password" />
    <Button type="submit">Odeslat</Button>
  </Form>

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'login' })(Login)
