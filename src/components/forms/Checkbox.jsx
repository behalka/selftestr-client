import React, { PropTypes, Component } from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'

class CheckboxField extends Component {
  static defaultProps = {
    options: [],
    checked: false,
  }
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }
  handleChange(event) {
    this.props.input.onChange(event.target.checked)
  }
  handleBlur() {
    this.props.input.onBlur()
  }
  render() {
    const { input, label, meta } = this.props
    const hasError = meta.touched && meta.error
    const hasWarning = meta.touched && meta.warning
    const isChecked = Boolean(input.value)
    const messageElem = hasError || hasWarning
      ? <span className="help-block">{meta.error || meta.warning}</span>
      : null
    return (
      <FormGroup
        controlId={input.name}
        validationState={hasError ? 'error' : null}
        onBlur={this.handleBlur}
        >
        <Checkbox inline
          onChange={this.handleChange}
          checked={isChecked}>
          {label}
        </Checkbox>
        {messageElem}
      </FormGroup>
    )
  }
}
export default CheckboxField
