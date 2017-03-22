import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLink } from 'react-router'
import UserPanel from './UserPanel'

/**
 * Todo: tohle se bude lisit podle toho jestli byl uzivatel prihlasenej nebo ne
 * do PROPS: udaje o prihlaseni a uzivateli!
 */
const Navigation = () =>
  <div className="navigation">
    <Navbar inverse staticTop>
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
      <UserPanel />
    </Navbar>
  </div>

export default Navigation
