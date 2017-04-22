import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { registerReq } from '../redux/auth/auth.actions'
import RegisterForm from '../components/forms/Register'

class Register extends Component {
  static propTypes = {
    registerReq: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(data) {
    this.props.registerReq(data, this.props.router)
  }
  render() {
    return (
      <RegisterForm onSubmit={this.handleSubmit} />
    )
  }
}

const mapDispatchToProps = {
  registerReq,
}

export default connect(null, mapDispatchToProps)(Register)
