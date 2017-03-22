import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import TestsOverview from './containers/TestsOverview'

// eslint-disable-next-line no-unused-vars
export default store => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={TestsOverview} />
      <Route path="testy" component={TestsOverview} />
      <Route path="historie" component={TestsOverview} />
    </Route>
  )
}
