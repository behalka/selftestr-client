import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import UserPanelComponent from '../components/layout/UserPanel'
import LoginItemComponent from '../components/layout/LoginMenuItem'

class UserPanel extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    // todo
    console.log('dispatching proper action!')
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
  auth: state.auth,
})
export default connect(mapStateToProps)(UserPanel)
