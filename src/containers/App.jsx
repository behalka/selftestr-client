import React, { Component, PropTypes } from 'react'
import AppWrapper from '../components/layout/AppWrapper'

class App extends Component {
  static propTypes = {
    appState: PropTypes.object.isRequired,
    // auth: PropTypes.object.isRequired,
    children: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props)
    console.log(this.props.appState)
    // todo: handle auth logic
  }
  render() {
    return (
      <AppWrapper children={this.props.children} />
    )
  }
}

export default App
