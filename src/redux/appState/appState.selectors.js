export const getEntity = (state, entity, entityId) => {
  if (!entity && entityId) {
    return null
  }
  const item = state.entities[entity][entityId]
  if (!item) {
    return null
  }
  return item
}

export const transformRoutes = (state, props) => {
  const { routes, params } = props
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
    /* nachazime se v route, ktera se ovlada pres parametr */
    if (semicolonIndex > -1 && params) {
      const param = route.path.slice(semicolonIndex + 1)
      /* konkretni id */
      const id = params[param]
      const { entity, entityName } = route
      const item = getEntity(state, entity, id)
      let paramName
      if (item) {
        paramName = item[entityName]
      }
      /* napojeni do routy */
      if (semicolonIndex !== 0) {
        const prev = route.path.slice(0, semicolonIndex - 1)
        names = names.concat([prev, paramName || id])
        paths = paths.concat([prev, `${prev}/${id}`])
      } else {
        names = names.concat([paramName || id])
        paths = paths.concat([id])
      }
    } else {
      names = names.concat([route.routeName || route.path])
      paths = paths.concat([route.path])
    }
  }
  return { names, paths }
}
