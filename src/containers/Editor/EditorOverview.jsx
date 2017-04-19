import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchByUser } from '../../redux/testModels/tests.actions'
import { initEditor } from '../../redux/editor/editor.actions'
import { getTestsByOwner } from '../../redux/testModels/tests.selectors'

import Loader from '../../components/layout/Loader'
import EditorOverviewComponent from '../../components/Editor/Overview'

class EditorOverview extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    fetchByUser: PropTypes.func.isRequired,
    initEditor: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired,
    testModels: PropTypes.object,
  }
  static defaultProps = {
    testModels: {
      isFetching: false,
      fetched: false,
      items: [],
    },
  }
  constructor(props) {
    super(props)
    this.createTestHandler = this.createTestHandler.bind(this)
    this.editTestHandler = this.editTestHandler.bind(this)
  }
  componentDidMount() {
    console.log(this.props.auth)
    console.log(this.props.params)
    const { testModels } = this.props
    // todo: stav, kdy uzivatel nema zadne testy!
    if (!testModels.fetched && !testModels.isFetching) {
      this.props.fetchByUser()
    }
  }
  createTestHandler() {
    // todo: dispatch action that will setup new testModel (create ids) and set "editor" field
  }
  editTestHandler(testModelId) {
    console.log(testModelId)
    // this.props.initEditor(testModelId)
    this.props.router.push(`/editor/${testModelId}`)
  }
  render() {
    const { testModels } = this.props
    return (
      <div>
        {testModels.isFetching && <Loader />}
        {!testModels.isFetching && <EditorOverviewComponent testModels={testModels.items} editTestHandler={this.editTestHandler} />}
      </div>
    )
  }
}
const mapStateToProps = (state, props) => ({
  testModels: getTestsByOwner(state, props),
})
const mapDispatchToProps = {
  fetchByUser,
  initEditor,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorOverview)