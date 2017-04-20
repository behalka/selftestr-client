import React, { PropTypes } from 'react'

const LimitedText = ({ classes, limit, input }) => {
  const textToDisplay = `${input.substring(0, limit)}...`
  return (
    <div className={classes}>
      {textToDisplay}
    </div>
  )
}
LimitedText.propTypes = {
  classes: PropTypes.string,
  input: PropTypes.string.isRequired,
  limit: PropTypes.number,
}
LimitedText.defaultProps = {
  classes: '',
  limit: 125,
}
export default LimitedText
