const validate = (values = {}) => {
  const errors = {}
  if (!values.text) {
    errors.text = 'Povinná položka'
  }
  if (!values.answer) {
    errors.answer = 'Povinná položka'
  }
  return errors
}
export default validate
