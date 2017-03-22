import React, { PropTypes } from 'react'
import { Breadcrumb } from 'react-bootstrap'

/*
 * todo: bude dynamicky generovat odkazy podle router.path
 * -> nektere budou mit fixni jmeno, jine budou doplnene (jmeno testu)
 */
const Breadcrumbs = props =>
  <Breadcrumb>
    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="#">Sth</Breadcrumb.Item>
    <Breadcrumb.Item active>Konecna</Breadcrumb.Item>
  </Breadcrumb>

export default Breadcrumbs
