import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'

const EditorOverview = ({ testModels, editTestHandler }) =>
  <div>
    <ul className="test-models">
      {testModels.map(test =>
        <li key={test.id}>
          {test.name}
          <Button onClick={() => editTestHandler(test.id)}>
            Editovat
          </Button>
        </li>
        )}
    </ul>
  </div>
EditorOverview.propTypes = {
  editTestHandler: PropTypes.func.isRequired,
  testModels: PropTypes.array.isRequired,
}
export default EditorOverview
