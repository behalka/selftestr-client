import React, { PropTypes, Component } from 'react'
import { FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

class Select extends Component {
  static defaultProps = {
    componentClass: 'select',
    feedback: true,
    placeholder: '',
    options: [],
  }
  static propTypes = {
    componentClass: PropTypes.string,
    feedback: PropTypes.bool,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    options: PropTypes.array,
    placeholder: PropTypes.string,
  }
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  handleChange(value) {
    this.props.input.onChange(value)
  }
  handleBlur() {
    this.props.input.onBlur()
  }
  render() {
    const { input, label, meta, placeholder, componentClass, options, feedback } = this.props
    const hasError = meta.touched && meta.error
    const hasWarning = meta.touched && meta.warning
    const messageElem = hasError || hasWarning
      ? <span className="help-block">{meta.error || meta.warning}</span>
      : null
    return (
      <FormGroup
        controlId={input.name}
        validationState={hasError ? 'error' : null}
        onBlur={this.handleBlur}
        onChange={this.handleChange}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl componentClass={componentClass} placeholder={placeholder} value={input.value || ''}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option =>
            <option key={option.value} value={option.value}>{option.text || option.value}</option>
            )}
        </FormControl>
        {feedback && <FormControl.Feedback />}
        {messageElem}
      </FormGroup>
    )
  }
}
export default Select
