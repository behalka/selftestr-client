import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLink } from 'react-router'

const Navigation = () =>
  <div className="navigation">
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/">Selftester!!!</IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/testy">
          <NavItem eventKey={1}>Moje testy</NavItem>
        </LinkContainer>
        <LinkContainer to="/historie">
          <NavItem eventKey={2}>Moje historie</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  </div>

export default Navigation
