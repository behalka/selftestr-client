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

/**
 * Pokud route vykresluje neco na zaklade parametru (id),
 * muzeme ji poslat dalsi props, ktere urci, z jake entity
 * ve store se ma dotahnout "oficialni" jmeno tehle entity.
 * Misto id se tak treba v drobeckove navigaci muze objevit jmeno testu
 * nebo zadani otazky..
 * props:
 *  entity - jmeno vetve v entities store slice
 *  entityName - parametr dane entity kterej se ma pouzit
 */

// eslint-disable-next-line no-unused-vars
export default store =>
  <Route path="/" component={App} routeName="Domů">
    <IndexRoute component={TestsOverview} />
    <Route path="testy">
      <IndexRoute component={TestsOverview} />
      <Route path=":test_id" component={TestDetail}
        entity="testDetails" entityName="name"/>
    </Route>
    <Route component={LoggedIn}>
      <Route path="editor" component={EditorOverview} />
      <Route path="editor/:test_model_id" component={Editor}
        entity="testsWithQuestions" entityName="name" />
    </Route>
    <Route path="historie" component={TestsOverview} />
    <Route path="login" component={Auth} />
    <Route path="registrace" component={Register} />
  </Route>
