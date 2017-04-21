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
    const { isLogged, isFetching } = this.props.auth
    if (!isLogged && !isFetching) {
      hashHistory.push('/login')
    }
  }
  render() {
    if (this.props.auth.isLogged) {
      return (
        <div>
          {React.cloneElement(this.props.children, { ...this.props })}
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
