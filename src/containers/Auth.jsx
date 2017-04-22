import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginRequest } from '../redux/auth/auth.actions.js'
import LoginForm from '../components/forms/Login'

class Auth extends Component {
  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(data) {
    this.props.loginRequest(data, this.props.router)
  }
  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit} />
    )
  }
}

const mapDispatchToProps = {
  loginRequest,
}

export default connect(null, mapDispatchToProps)(Auth)
