import React, { PropTypes } from 'react'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

/**
 * Dostane udaje od redux-form Field
 * a vykresli prislusne bootstrap komponentu
 */

const Input = props => {
  const { input, label, meta, type, placeholder, componentClass } = props
  // todo: validationState - mozne values: error, warning, success, null!
  const hasError = meta.touched && meta.error
  const hasWarning = meta.touched && meta.warning
  const messageElem = hasError || hasWarning
    ? <span className="help-block">{meta.error || meta.warning}</span>
    : null

  return (
    <FormGroup controlId={input.name} validationState={hasError ? 'error' : null}>
      <ControlLabel>
        {label}
      </ControlLabel>
      <FormControl
        value={input.value}
        placeholder={placeholder}
        onChange={input.onChange}
        type={type}
        componentClass={componentClass}
      />
      <FormControl.Feedback />
      {messageElem}
    </FormGroup>
  )
}

Input.defaultProps = {
  componentClass: 'input',
  type: 'text',
  placeholder: '',
}
Input.propTypes = {
  componentClass: PropTypes.string,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

export default Input
