import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Navigation from './Navigation'
import Breadcrumbs from './Breadcrumbs'

const AppWrapper = props =>
  <div className="page">
    <Grid fluid>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col xs={12}>
          <Breadcrumbs/>
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
