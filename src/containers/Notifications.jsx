import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { hideNotification } from '../redux/appState/appState.actions'
import Panel from '../components/NotificationPanel/Panel'

class Notifications extends Component {
  static propTypes = {
    hideNotification: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props)
    this.removeNotificationHandler = this.removeNotificationHandler.bind(this)
  }
  removeNotificationHandler(message) {
    this.props.hideNotification(message)
  }
  render() {
    const { notifications } = this.props
    return (
      <Panel notifications={notifications} removeHandler={this.removeNotificationHandler} />
    )
  }
}
const mapStateToProps = state => ({
  notifications: state.appState.notifications,
})
const mapDispatchToProps = {
  hideNotification,
}
export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
