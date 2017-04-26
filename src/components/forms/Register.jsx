import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'
import Input from './Input'

const validate = (values = {}) => {
  const errors = {}
  const mandatoryFields = ['username', 'email', 'password']
  mandatoryFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Povinná položka'
    }
  })
  if (values.password && values.password.length < 5) {
    errors.password = 'Heslo musí být delší než 5 znaků'
  }
  return errors
}

const Register = ({ handleSubmit }) =>
  <Form onSubmit={handleSubmit}>
    <Field name="username" required label="Uživatelské jméno" component={Input} type="text" />
    <Field name="email" required label="E-mail" component={Input} type="text" />
    <Field name="password" required label="Heslo" component={Input} type="password" />
    <Button type="submit">Vytvořit</Button>
  </Form>

Register.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  validate,
  form: 'register',
})(Register)
