import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const ContentOverview = ({ testModel, isNew, displayGeneral }) =>
  <div>
    {isNew &&
      <div>
        <p>
          Vítejte v editoru testů. Nejprve prosím vyplňte obecné údaje o testu.
        </p>
        <Button onClick={displayGeneral} bsSize="large" bsStyle="success">Zadat údaje o testu</Button>
      </div>}
    {!isNew && <div>
        <h1>{testModel.name}</h1>
        <p>{testModel.description}</p>
        <h3>Základní nastavení</h3>
        <ul>
          <li><strong>Počet otázek ve vygenerovaném testu:</strong>{testModel.questionsPerTestInstance}</li>
          <li><strong>Časový limit testu:</strong>{testModel.timeLimit !== null ? testModel.timeLimit : 'Bez limitu'}</li>
        </ul>
      </div>}
  </div>
ContentOverview.propTypes = {
  displayGeneral: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  testModel: PropTypes.object,
}
ContentOverview.defaultProps = {
  isNew: false,
  testModel: {},
}
export default ContentOverview
