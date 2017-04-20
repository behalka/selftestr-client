import React, { PropTypes, Component } from 'react'
import { FormGroup, Radio } from 'react-bootstrap'

class RadioField extends Component {
  static defaultProps = {
    options: [],
    checked: false
  }
  static propTypes = {
    changeHandler: PropTypes.func.isRequired,
    checked: PropTypes.bool,
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
    const { input, label, meta, changeHandler, checked } = this.props
    const hasError = meta.touched && meta.error
    const hasWarning = meta.touched && meta.warning
    const isChecked = Boolean(checked)
    const messageElem = hasError || hasWarning
      ? <span className="help-block">{meta.error || meta.warning}</span>
      : null
    return (
      <FormGroup
        controlId={input.name}
        validationState={hasError ? 'error' : null}
        onBlur={this.handleBlur}
        >
        <Radio inline name={input.name}
          onChange={changeHandler}
          checked={isChecked}>
          {label}
        </Radio>
        {messageElem}
      </FormGroup>
    )
  }
}
export default RadioField
