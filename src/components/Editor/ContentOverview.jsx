import React, { PropTypes } from 'react'

const ContentOverview = ({ testModel }) =>
  <div>
    <h1>{testModel.name}</h1>
    <p>{testModel.description}</p>
    <h3>Základní nastavení</h3>
    <ul>
      <li><strong>Počet otázek ve vygenerovaném testu:</strong>{testModel.questionsPerTestInstance}</li>
      <li><strong>Časový limit testu:</strong>{testModel.timeLimit !== null ? testModel.timeLimit : 'Bez limitu'}</li>
    </ul>
  </div>
ContentOverview.propTypes = {
  testModel: PropTypes.object,
}
ContentOverview.defaultProps = {
  testModel: {},
}
export default ContentOverview
