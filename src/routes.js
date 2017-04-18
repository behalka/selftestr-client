import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import TestsOverview from './containers/TestsOverview'
import TestDetail from './containers/TestDetail'
import Auth from './containers/Auth'
import LoggedIn from './containers/LoggedIn'
import Editor from './containers/Editor'

// eslint-disable-next-line no-unused-vars
export default store =>
  <Route path="/" component={App}>
    <IndexRoute component={TestsOverview} />
    <Route path="testy">
      <IndexRoute component={TestsOverview} />
      <Route path=":test_id" component={TestDetail} />
    </Route>
    <Route component={LoggedIn}>
      <Route path="editor" component={Editor}>
      </Route>
    </Route>
    <Route path="historie" component={TestsOverview} />
    <Route path="login" component={Auth} />
  </Route>
