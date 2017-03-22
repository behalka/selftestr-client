import React, { Component, PropTypes } from 'react'

class TestsOverview extends Component {
  static propTypes = {
    route: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div><b>{this.props.route.path}</b></div>
    )
  }
}

export default TestsOverview
