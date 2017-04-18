import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTestModelFromId } from '../../redux/testModels/tests.selectors'
// import { fetchByUser } from '../redux/testModels/tests.actions'
import { Button, Row, Col } from 'react-bootstrap'

class EditorSidebar extends Component {
  static propTypes = {
    testDetail: PropTypes.object,
    testModelId: PropTypes.string.isRequired,
    saveHandler: PropTypes.func,
    leaveHandler: PropTypes.func,
  }
  static defaultProps = {
    testDetail: {
      name: 'Hello',
    },
  }
  render() {
    console.log(this.props.testDetail)
    const { testDetail } = this.props
    return (
      <nav className="editor__navbar">
        <h1 className="test-model__name">
          {testDetail.name || 'Jméno testu není zadané'}
        </h1>
        <div className="test-model__desc">
          {testDetail.description || 'Popis není zadaný'}
        </div>
        <Button bsStyle="primary">Uložit test</Button>
        <Button>Opustit editor</Button>
      </nav>
    )
  }
}

const mapStateToProps = (state, props) => ({
  testDetail: getTestModelFromId(state, props.testModelId),
})

export default connect(mapStateToProps, {})(EditorSidebar)
