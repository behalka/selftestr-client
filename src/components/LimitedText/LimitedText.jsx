import React, { PropTypes } from 'react'

const LimitedText = ({ classes, limit, input }) => {
  let textToDisplay = input
  ? `${input.substring(0, limit)}`
  : ''
  if (input && textToDisplay.length < input.length) {
    textToDisplay = textToDisplay.concat('...')
  }
  return (
    <div className={classes}>
      {textToDisplay}
    </div>
  )
}
LimitedText.propTypes = {
  classes: PropTypes.string,
  input: PropTypes.string,
  limit: PropTypes.number,
}
LimitedText.defaultProps = {
  classes: '',
  input: null,
  limit: 125,
}
export default LimitedText
