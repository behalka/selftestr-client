import React, { PropTypes } from 'react'
import { Form, Button } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import Input from '../forms/Input'

// import FontAwesome from 'react-fontawesome'

const AddCommentForm = ({ handleSubmit }) =>
  <Form onSubmit={handleSubmit}>
    <Field name="comment" label="Komentář" component={Input} componentClass="textarea" />
    <Button type="submit">Odeslat</Button>
  </Form>
AddCommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
export default reduxForm({ form: 'addComment' })(AddCommentForm)
