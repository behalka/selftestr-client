import React, { PropTypes } from 'react'
import { Nav, NavDropdown, MenuItem, Navbar } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'

const UserPanel = props =>
  <Nav pullRight>
    <Navbar.Text className="userpanel__icon"><FontAwesome name="user-circle" size="lg" /></Navbar.Text>
    <NavDropdown eventKey={3} title={props.user.username} id="userpanel-dropdown">
      <MenuItem eventKey={3.1}>Nastavení</MenuItem>
      <MenuItem eventKey={3.2} onClick={props.handleLogout}>Log out</MenuItem>
    </NavDropdown>
  </Nav>

UserPanel.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default UserPanel
