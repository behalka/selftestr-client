import React, { Component, PropTypes } from 'react'
import AppWrapper from '../components/layout/AppWrapper'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { loginRequest } from '../redux/auth/auth.actions.js'

class App extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    console.log(this.props.auth)
    // todo: handle auth logic
  }
  componentWillReceiveProps(nextProps) {
    const loggedIn = this.props.auth.isLogged
    const nextLoggedIn = nextProps.auth.isLogged
    // doslo k prihlaseni! -> todo: poslat na admin homepage
    if (!loggedIn && nextLoggedIn) {
      hashHistory.push('/editor')
      // hashHistory.push('/')
    } else if (loggedIn && !nextLoggedIn) {
      hashHistory.push('/')
    }
  }
  componentDidMount() {
    this.props.dispatch(loginRequest({ username: 'john', password: 'password' }))
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

export default connect(mapStateToProps)(App)
