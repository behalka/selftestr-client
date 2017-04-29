import React, { PropTypes } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { transformRoutes } from '../../redux/appState/appState.selectors'

const BreadcrumbsPanel = props => {
  const { routes, transformedRoutes } = props
  // const { names, paths } = transformPath(routes, params)
  const { names, paths } = transformedRoutes
  return (
    <Breadcrumb>
    {routes.map((route, index) =>
        <Breadcrumb.Item key={paths[index]} active={index === paths.length - 1}>
          {index === paths.length - 1
            ? names[index]
            : <Link to={paths[index]}>{names[index]}</Link>
          }
        </Breadcrumb.Item>
    )}
    </Breadcrumb>
  )
}
BreadcrumbsPanel.propTypes = {
  routes: PropTypes.array,
  transformedRoutes: PropTypes.object,
}
BreadcrumbsPanel.defaultProps = {
  routes: [],
  transformedRoutes: {},
}
const mapStateToProps = (state, props) => ({
  transformedRoutes: transformRoutes(state, props),
})

export default connect(mapStateToProps, {})(BreadcrumbsPanel)
