import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { IndexLink } from 'react-router'
import UserPanel from '../../containers/UserPanel'

/**
 * Todo: tohle se bude lisit podle toho jestli byl uzivatel prihlasenej nebo ne
 * do PROPS: udaje o prihlaseni a uzivateli!
 */
const Navigation = () =>
  <div>
    <Navbar inverse staticTop className="custom-nav">
      <Navbar.Header>
        <Navbar.Brand className="index-link">
          <IndexLink to="/">Selftester</IndexLink>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to="/testy">
          <NavItem eventKey={1}>Testy</NavItem>
        </LinkContainer>
        <LinkContainer to="/editor">
          <NavItem eventKey={2}>Editor</NavItem>
        </LinkContainer>
        <LinkContainer to="/historie">
          <NavItem eventKey={3}>Moje historie</NavItem>
        </LinkContainer>
      </Nav>
      <UserPanel />
    </Navbar>
  </div>

export default Navigation
          // <IndexLink to="/" className="navigation__index">Selftester!!!</IndexLink>
