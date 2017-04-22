import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import { Row, Col } from 'react-bootstrap'
import texts from '../../constants/formHelpers'

// import formTypes from '../../constants/createTest/formTypes'
import Input from '../forms/Input'
import Radio from '../forms/Radio'

const SinglechoiceAnswer = ({ answerModel, index, correctIndex, updateSelectedAnswer, groupName }) =>
  <Row>
    <Col xs={12}>
      <Field
        name={`${answerModel}.text`}
        label="Znění odpovědi"
        required
        helper={texts.helpers.singlechoiceAnswer}
        component={Input} type="text"/>
    </Col>
    <Col xs={12}>
      <Field
        name={groupName}
        value={index}
        id={`answer${index}`}
        component={Radio}
        label="Je odpověď správně"
        type="radio"
        checked={correctIndex === index}
        changeHandler={updateSelectedAnswer}
      />
    </Col>
  </Row>

SinglechoiceAnswer.propTypes = {
  answerModel: PropTypes.string.isRequired,
  correctIndex: PropTypes.number,
  groupName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  updateSelectedAnswer: PropTypes.func.isRequired,
}
SinglechoiceAnswer.defaultProps = {
  correctIndex: null,
}

const selector = formValueSelector('singlechoice')
const mapStateToProps = state => ({
  correctIndex: parseInt(selector(state, 'isCorrectGroup')),
})
export default connect(mapStateToProps)(SinglechoiceAnswer)
