import React, { PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button } from 'react-bootstrap'

import Select from '../forms/Select'

const validate = (values = {}) => {
  const errors = {}
  if (!values.type) {
    errors.type = 'Je nutno zvolit jeden z typů otázky.'
  }
  return errors
}

const QuestionSelect = props => {
  const { options, handleSubmit, buttonClasses } = props
  return (
    <Form onSubmit={handleSubmit} className="test-model__add">
      <Field
        name="type"
        placeholder="Zvolte typ otázky"
        component={Select}
        options={options}
        feedback={false}
      />
      <Button block type="submit" bsStyle="success" className={buttonClasses}>Přidat otázku</Button>
    </Form>
  )
}
QuestionSelect.propTypes = {
  buttonClasses: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.array,
}
QuestionSelect.defaultProps = {
  options: [],
  buttonClasses: '',
}
export default reduxForm({ validate, form: 'questionSelect' })(QuestionSelect)
