import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'

// import formTypes from '../../constants/createTest/formTypes'
import Input from '../forms/Input'
import Radio from '../forms/Radio'

const SinglechoiceAnswer = ({ answerModel, index, correctIndex, updateSelectedAnswer, groupName }) =>
  <div>
    <Field
      name={`${answerModel}.text`}
      label="Znění odpovědi"
      required
      component={Input} type="text"/>
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
  </div>

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
