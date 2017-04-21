import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

const EditorOverview = ({ testModels, editTestHandler, deleteTestHandler }) =>
  <div>
    <ul className="test-models">
      {testModels.map(test =>
        <li key={test.id}>
          {test.name}
          <Button onClick={() => editTestHandler(test.id)}>
            Editovat
          </Button>
          <Button bsStyle="danger" onClick={() => deleteTestHandler(test.id)}>
            Smazat
          </Button>
        </li>
        )}
    </ul>
  </div>
EditorOverview.propTypes = {
  deleteTestHandler: PropTypes.func.isRequired,
  editTestHandler: PropTypes.func.isRequired,
  testModels: PropTypes.array.isRequired,
}
export default EditorOverview
