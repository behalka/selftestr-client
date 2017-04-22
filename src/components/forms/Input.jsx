import React, { PropTypes, Component } from 'react'
import { FormControl, FormGroup, ControlLabel, OverlayTrigger, Tooltip } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

class Input extends Component {
  static defaultProps = {
    componentClass: 'input',
    type: 'text',
    placeholder: '',
    required: false,
    helper: null,
  }
  static propTypes = {
    componentClass: PropTypes.string,
    helper: PropTypes.string,
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
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
    const { input, label, meta, type, placeholder, helper, componentClass, required } = this.props
    const hasError = meta.touched && meta.error
    const hasWarning = meta.touched && meta.warning
    const hasHelp = Boolean(helper)
    const messageElem = hasError || hasWarning
      ? <span className="help-block">{meta.error || meta.warning}</span>
      : null

    return (
      <FormGroup
        controlId={input.name}
        onBlur={this.handleBlur}
        className="editor-input"
        validationState={hasError ? 'error' : null}>
        <ControlLabel className={hasHelp ? 'editor-input__label-help' : ''}>
          <span className={required ? 'editor-input__required-field' : ''}>{label}</span>
          {hasHelp
            && <OverlayTrigger placement="left" overlay={<Tooltip>{helper}</Tooltip>}>
                <span className="editor-input__field-helper">
                  <FontAwesome name="question-circle" size="lg" />
                </span>
              </OverlayTrigger>
          }
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
