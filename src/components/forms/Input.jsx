import React, { PropTypes, Component } from 'react'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

/**
 * Dostane udaje od redux-form Field
 * a vykresli prislusne bootstrap komponentu
 */

class Input extends Component {
  static defaultProps = {
    componentClass: 'input',
    type: 'text',
    placeholder: '',
  }
  static propTypes = {
    componentClass: PropTypes.string,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
  }
  handleBlur() {
    this.props.input.onBlur()
  }
  render() {
    const { input, label, meta, type, placeholder, componentClass } = this.props
    // todo: validationState - mozne values: error, warning, success, null!
    const hasError = meta.touched && meta.error
    const hasWarning = meta.touched && meta.warning
    const messageElem = hasError || hasWarning
      ? <span className="help-block">{meta.error || meta.warning}</span>
      : null

    return (
      <FormGroup
        controlId={input.name}
        onBlur={this.handleBlur}
        validationState={hasError ? 'error' : null}>
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
}

export default Input
