import React, { PropTypes } from 'react'
import { Alert } from 'react-bootstrap'
import LimitedText from '../../components/LimitedText/LimitedText'
import questionTypes from '../../constants/questionTypes'

const ContentOverview = ({ testModel, isNew }) =>
  <div>
    {isNew &&
      <div>
        <Alert bsStyle="info">
          Vítejte v editoru testů. Nejprve prosím vyplňte obecné údaje o testu.
        </Alert>
      </div>}
    {!isNew && <div>
        <h1>{testModel.name}</h1>
        <p>{testModel.description}</p>
        <h3>Základní nastavení</h3>
        <ul>
          <li>
            <strong>Počet otázek ve vygenerovaném testu:</strong>
            {testModel.questionsPerTestInstance || 'Nezadáno'}
          </li>
          <li>
            <strong>Časový limit testu:</strong>
            {console.log(testModel)}
            {testModel.timeLimit !== null ? testModel.timeLimit : 'Bez limitu'}
          </li>
        </ul>
        <h2>Přehled otázek</h2>
        <ul>
          {testModel.questionModels.map((question, index) =>
            <li key={question.id}>
              {index + 1}:
                Typ: ({questionTypes[question.type].name})
                <LimitedText limit={50} input={question.text} />
            </li>
            )}
        </ul>
      </div>}
  </div>
ContentOverview.propTypes = {
  isNew: PropTypes.bool,
  testModel: PropTypes.object,
}
ContentOverview.defaultProps = {
  isNew: false,
  testModel: {},
}
export default ContentOverview
