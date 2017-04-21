import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

const EditorOverview = props => {
  const { testModels, initModal, selectedModal, createModal, editTestHandler } = props
  return (
    <div>
      <ul className="test-models">
        {testModels.map(test =>
          <li key={test.id}>
            {createModal(test.id, test.name, selectedModal)}
            {test.name}
            <Button bsStyle="success" onClick={() => editTestHandler(test.id)}>
              Editovat
            </Button>
            <Button bsStyle="danger" onClick={() => initModal(test.id)}>
              Smazat
            </Button>
          </li>
          )}
      </ul>
    </div>
  )
}
EditorOverview.propTypes = {
  createModal: PropTypes.func.isRequired,
  editTestHandler: PropTypes.func.isRequired,
  initModal: PropTypes.func.isRequired,
  selectedModal: PropTypes.string,
  testModels: PropTypes.array.isRequired,
}
EditorOverview.defaultProps = {
  selectedModal: null,
}
export default EditorOverview
