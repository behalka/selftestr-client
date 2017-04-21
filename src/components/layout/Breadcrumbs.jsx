import React, { PropTypes } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router'

const transformPath = (routes, params) => {
  if (!routes) {
    return []
  }
  let names = []
  let paths = []
  for (const route of routes) {
    if (!route || !route.path) {
      continue
    }
    const semicolonIndex = route.path.indexOf(':')
    if (semicolonIndex > -1 && params) {
      const param = route.path.slice(semicolonIndex + 1)
      if (semicolonIndex !== 0) {
        const prev = route.path.slice(0, semicolonIndex - 1)
        const result = params[param]
        names = names.concat([prev, result])
        paths = paths.concat([prev, `${prev}/${result}`])
      } else {
        const result = params[param]
        names = names.concat([result])
        paths = paths.concat([result])
      }
    } else {
      names = names.concat([route.routeName || route.path])
      paths = paths.concat([route.path])
    }
  }
  return { names, paths }
}
const BreadcrumbsPanel = props => {
  const { routes, params } = props
  const { names, paths } = transformPath(routes, params)
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
  params: PropTypes.object,
  routes: PropTypes.array,
}
BreadcrumbsPanel.defaultProps = {
  routes: [],
  params: {},
}

export default BreadcrumbsPanel
