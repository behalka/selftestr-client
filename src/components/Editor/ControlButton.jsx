import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'

const ControlButton = ({ submitHandler, bsStyle, isDisabled, content, iconName }) => {
  const classes = classNames({
    disabled: isDisabled,
    'test-model__control': true,
  })
  return (
    <Button
      className={classes}
      onClick={submitHandler}
      bsStyle={bsStyle}
      block>
      <FontAwesome name={iconName} />
      {content}
    </Button>
  )
}

ControlButton.propTypes = {
  bsStyle: PropTypes.string,
  content: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  submitHandler: PropTypes.func.isRequired,
}
ControlButton.defaultProps = {
  bsStyle: 'default',
}
export default ControlButton
