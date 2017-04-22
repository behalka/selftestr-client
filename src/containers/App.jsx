import React, { Component, PropTypes } from 'react'
import AppWrapper from '../components/layout/AppWrapper'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { recoverFromTokenReq } from '../redux/auth/auth.actions'

class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    recoverFromToken: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    const loggedIn = this.props.auth.isLogged
    const nextLoggedIn = nextProps.auth.isLogged
    // doslo k logout
    if (loggedIn && !nextLoggedIn) {
      console.log('logout')
      hashHistory.push('/')
    }
  }
  componentDidMount() {
    this.props.recoverFromToken()
  }
  render() {
    return (
      <AppWrapper
        routes={this.props.routes}
        location={this.props.location}
        params={this.props.params}
        children={this.props.children} />
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
