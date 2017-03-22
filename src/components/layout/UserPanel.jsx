import React, { PropTypes } from 'react'
import { Nav, NavDropdown, MenuItem, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'

const username = 'John Doe'

/*
 * todo: detaily o uzivateli z props.
 * obalit LinkContainer veci
 */
const UserPanel = props =>
  <Nav pullRight>
    <Navbar.Text className="userpanel__icon"><FontAwesome name="user-circle" size="lg" /></Navbar.Text>
    <NavDropdown eventKey={3} title={username} id="userpanel-dropdown">
      <MenuItem eventKey={3.1}>Nastavení</MenuItem>
      <MenuItem eventKey={3.2}>Log out</MenuItem>
    </NavDropdown>
  </Nav>

export default UserPanel
