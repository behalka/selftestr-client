import React, { PropTypes } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const LoginMenuItem = () =>
  <Nav pullRight>
    <LinkContainer to="/login">
      <NavItem eventKey={1}>Login</NavItem>
    </LinkContainer>
    <LinkContainer to="/registrace">
      <NavItem eventKey={1}>Registrace</NavItem>
    </LinkContainer>
  </Nav>

export default LoginMenuItem
