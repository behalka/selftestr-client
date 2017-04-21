import React, { Component, PropTypes } from 'react'
import AppWrapper from '../components/layout/AppWrapper'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { recoverFromTokenReq } from '../redux/auth/auth.actions'

class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    recoverFromToken: PropTypes.func.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    const loggedIn = this.props.auth.isLogged
    const nextLoggedIn = nextProps.auth.isLogged
    // doslo k prihlaseni! -> todo: poslat na admin homepage
    if (!loggedIn && nextLoggedIn) {
      hashHistory.push('/editor')
    } else if (loggedIn && !nextLoggedIn) {
      hashHistory.push('/')
    }
  }
  componentDidMount() {
    this.props.recoverFromToken()
  }
  render() {
    return (
      <AppWrapper children={this.props.children} />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})
const mapDispatchToProps = {
  recoverFromToken: recoverFromTokenReq,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
