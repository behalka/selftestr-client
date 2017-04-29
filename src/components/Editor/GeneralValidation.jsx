const validate = (values = {}) => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Povinná položka'
  }
  if (!values.description) {
    errors.description = 'Povinná položka'
  }
  return errors
}
export default validate
