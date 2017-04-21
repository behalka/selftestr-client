import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './containers/App'
import TestsOverview from './containers/TestsOverview'
import TestDetail from './containers/TestDetail'
import Auth from './containers/Auth'
import Register from './containers/Register'
import LoggedIn from './containers/LoggedIn'
import Editor from './containers/Editor/Editor'
import EditorOverview from './containers/Editor/EditorOverview'

// eslint-disable-next-line no-unused-vars
export default store =>
  <Route path="/" component={App} routeName="Domů">
    <IndexRoute component={TestsOverview} />
    <Route path="testy">
      <IndexRoute component={TestsOverview} />
      <Route path=":test_id" component={TestDetail} />
    </Route>
    <Route component={LoggedIn}>
      <Route path="editor" component={EditorOverview} />
      <Route path="editor/:test_model_id" component={Editor} />
    </Route>
    <Route path="historie" component={TestsOverview} />
    <Route path="login" component={Auth} />
    <Route path="registrace" component={Register} />
  </Route>
