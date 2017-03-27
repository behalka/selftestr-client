import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const Tag = ({ value, linkTo, btnClass }) =>
  <Button bsSize="large" className={btnClass} href={linkTo}>
    {value}
  </Button>
Tag.propTypes = {
  btnClass: PropTypes.string,
  linkTo: PropTypes.string,
  value: PropTypes.string.isRequired,
}
Tag.defaultProps = {
  linkTo: '#',
  btnClass: 'tag--default',
}

export default Tag
