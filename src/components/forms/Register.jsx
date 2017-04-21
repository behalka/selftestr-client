import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'
import Input from './Input'

const Login = ({ handleSubmit }) =>
  <Form onSubmit={handleSubmit}>
    <Field name="username" required label="Uživatelské jméno" component={Input} type="text" />
    <Field name="email" required label="E-mail" component={Input} type="text" />
    <Field name="password" required label="Heslo" component={Input} type="password" />
    <Button type="submit">Vytvořit</Button>
  </Form>

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'register' })(Login)
