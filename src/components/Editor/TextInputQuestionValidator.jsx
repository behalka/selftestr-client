const validate = (values = {}) => {
  const errors = {}
  if (!values.text) {
    errors.text = 'Povinná položka'
  }
  // todo:
  // if (!values.answerModels[0].text) {
  //   errors.answerModels[0].text = 'Povinná položka'
  // }
  return errors
}
export default validate
