import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'

const Tag = ({ value, linkTo, sizes }) => {
  const classes = classNames({
    'tag--default': true,
    'tag--large': sizes === 'large',
    'tag--small': sizes === 'small',
  })
  return (
    <Button bsSize={sizes} className={classes} href={linkTo}>
      {value}
    </Button>
  )
}
Tag.propTypes = {
  linkTo: PropTypes.string,
  sizes: PropTypes.string,
  value: PropTypes.string.isRequired,
}
Tag.defaultProps = {
  linkTo: '#',
  sizes: 'default',
}

export default Tag
