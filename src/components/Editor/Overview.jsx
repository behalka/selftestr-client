import React, { PropTypes } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'

const EditorOverview = props => {
  const { testModels, initModal, selectedModal, createModal, editTestHandler } = props
  return (
    <div>
      <table className="test-models">
        <thead>
          <tr className="test-models__header">
            <td>Jméno testu</td>
            <td>Počet otázek</td>
            <td>Možnosti</td>
          </tr>
        </thead>
        <tbody>
        {testModels.map(test =>
          <tr key={test.id} className="test-models__item">
            <td>
              {test.name}
            </td>
            <td>
              {test.questionModels.length}
            </td>
            <td>
              <Button bsStyle="success" className="test-models__btn" onClick={() => editTestHandler(test.id)}>
                Editovat
              </Button>
              <Button bsStyle="danger" className="test-models__btn" onClick={() => initModal(test.id)}>
                Smazat
              </Button>
            </td>
          </tr>)
        }
        </tbody>
      </table>
    </div>
  )
}
      // <ul className="test-models">
      //   {testModels.map(test =>
      //     <li key={test.id}>
      //       {createModal(test.id, test.name, selectedModal)}
      //       {test.name}
      //     </li>
      //     )}
      // </ul>
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
