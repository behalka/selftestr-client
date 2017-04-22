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
    const { isLogged, isFetching, isVerifying } = this.props.auth
    if (isVerifying) {
      console.log('waiting')
    }
    if (!isLogged && !isFetching && !isVerifying) {
      hashHistory.push('/login')
    }
  }
  componentWillReceiveProps(nextProps) {
    const { isLogged, isVerifying } = this.props.auth
    const { isLogged: nextLogged, isVerifying: nextVerifying, isFetching: nextFetching } = nextProps.auth
    if (!nextVerifying && nextLogged) {
      console.log('stay on the page')
    }
    if (!nextLogged && !nextFetching && !nextVerifying) {
      hashHistory.push('/login')
    }
  }
  render() {
    const { isVerifying, isLogged } = this.props.auth
    if (isLogged) {
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
