/* eslint-disable react/no-unused-prop-types */
import React, { PropTypes, Component } from 'react'

class ContentForm extends Component {
  static propTypes = {
    deleteQuestionHandler: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    setFormChanged: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      formUpdated: false,
    }
    this.resetAndScroll = this.resetAndScroll.bind(this)
  }
  resetAndScroll() {
    const { reset } = this.props
    reset()
    window.scrollTo(0, 0)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.dirty !== this.state.formUpdated) {
      this.setState({ formUpdated: newProps.dirty })
      this.props.setFormChanged(newProps.dirty)
    }
  }
}
export default ContentForm
