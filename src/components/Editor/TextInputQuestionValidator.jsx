const validate = (values = {}) => {
  const errors = {}
  if (!values.question) {
    errors.question = 'Povinná položka'
  }
  if (!values.answer) {
    errors.answer = 'Povinná položka'
  }
  return errors
}
export default validate
