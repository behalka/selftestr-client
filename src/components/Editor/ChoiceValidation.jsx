/* eslint-disable no-underscore-dangle */

const validate = (values = {}) => {
  const errors = {}
  if (!values.text) {
    errors.text = 'Povinná položka'
  }
  if (!values.answerModels || values.answerModels.length === 0) {
    errors.answerModels = errors.answerModels || {}
    errors.answerModels._error = 'Je nutno vytvořit aspoň jednu odpověď'
  } else {
    const answersErrors = []
    values.answerModels.forEach((answer, index) => {
      const currentErrors = {}
      if (!answer || !answer.text) {
        currentErrors.text = 'Povinná položka'
        answersErrors[index] = currentErrors
      }
    })
    if (answersErrors.length > 0) {
      errors.answerModels = answersErrors
    }
  }
  return errors
}

export default validate
