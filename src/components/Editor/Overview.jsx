import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

const EditorOverview = props => {
  const { testModels, initModal, selectedModal, createModal, editTestHandler } = props
  return (
    <div>
      {(!testModels || testModels.length === 0) && <p>Zatím nemáte vytvořené žádné testy</p>}
      {testModels.length !== 0 &&
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
              {createModal(test.id, test.name, selectedModal)}
              <td>
                {test.name}
              </td>
              <td>
                {test.questionModels.length}
              </td>
              <td>
                <Button bsStyle="success" className="test-models__btn" onClick={() => editTestHandler(test.id)}>
                  <FontAwesome name="pencil" />
                  Editovat
                </Button>
                <Button bsStyle="danger" className="test-models__btn" onClick={() => initModal(test.id)}>
                  <FontAwesome name="trash-o" />
                  Smazat
                </Button>
              </td>
            </tr>)
          }
          </tbody>
        </table>
      }
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
