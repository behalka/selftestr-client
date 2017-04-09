import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { getAuth } from '../redux/auth/auth.selectors'
import { logoutRequest } from '../redux/auth/auth.actions'

import UserPanelComponent from '../components/layout/UserPanel'
import LoginItemComponent from '../components/layout/LoginMenuItem'

class UserPanel extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logoutRequest: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    this.props.logoutRequest()
  }
  render() {
    const { isLogged, user } = this.props.auth
    return (
      <div>
        {isLogged
          ? <UserPanelComponent user={user} handleLogout={this.handleLogout} />
          : <LoginItemComponent />
        }
      </div>
    )
  }
}
const mapStateToProps = state => ({
  auth: getAuth(state),
})
const mapDispatchToProps = {
  logoutRequest,
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)
