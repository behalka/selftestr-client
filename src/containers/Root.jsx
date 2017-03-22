import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, browserHistory, hashHistory } from 'react-router'
import initRoutes from '../routes'

// todo: switch back to hashHistory
const Root = ({ store }) => {
  const routes = initRoutes(store)
  return (
    <Provider store={store}>
      <Router history={hashHistory} routes={routes} />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
