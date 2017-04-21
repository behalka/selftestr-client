import React, { PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Navigation from './Navigation'
import Breadcrumbs from './Breadcrumbs'
import Notifications from '../../containers/Notifications'

const AppWrapper = props =>
  <div className="page">
    <Grid fluid>
      <Row>
        <Navigation />
      </Row>
      <Notifications />
      <Row>
        <Col xs={12}>
          <Grid>
            <Row>
              <Breadcrumbs/>
            </Row>
            <Row>
              {props.children}
            </Row>
          </Grid>
        </Col>
      </Row>
    </Grid>
  </div>

AppWrapper.propTypes = {
  children: PropTypes.object.isRequired,
}

export default AppWrapper
