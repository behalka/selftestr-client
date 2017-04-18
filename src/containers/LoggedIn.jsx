import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getAuth } from '../redux/auth/auth.selectors'
import { hashHistory } from 'react-router'

class LoggedIn extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { isLogged } = this.props.auth
    if (!isLogged) {
      hashHistory.push('/login')
    }
  }
  render() {
    if (this.props.auth.isLogged) {
      return (
        <div>
          {React.cloneElement(this.props.children, { auth: this.props.auth })}
        </div>
      )
    }
    return null
  }
}
const mapStateToProps = state => ({
  auth: getAuth(state),
})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn)
