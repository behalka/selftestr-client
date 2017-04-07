import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import TestsOverview from './containers/TestsOverview'
import TestDetail from './containers/TestDetail'
import Auth from './containers/Auth'

// eslint-disable-next-line no-unused-vars
export default store => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={TestsOverview} />
      <Route path="testy">
        <IndexRoute component={TestsOverview} />
        <Route path=":test_id" component={TestDetail} />
      </Route>
      <Route path="historie" component={TestsOverview} />
      <Route path="login" component={Auth} />
    </Route>
  )
}
