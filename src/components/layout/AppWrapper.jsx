import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Navigation from './Navigation'

const AppWrapper = props =>
  <div className="page--wrapper">
    <Grid fluid>
      <Row>
        <Col xs={12} sm={9}>
          <Navigation />
        </Col>
        <Col xs={12} sm={3}>
          USER PROFILE - todo: to the nav
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {props.children}
        </Col>
      </Row>
    </Grid>
  </div>

AppWrapper.propTypes = {
  children: PropTypes.object.isRequired,
}

export default AppWrapper
