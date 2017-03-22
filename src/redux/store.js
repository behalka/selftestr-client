import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/rootReducer'
// import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

export function configure() {
  const initialState = {}
  const middleware = [
    sagaMiddleware,
  ]
  // todo: dev env only
  const devTools = window.devToolsExtension ? window.devToolsExtension() : func => func
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), devTools)
  )

  // sagaMiddleware.run(rootSaga)
  return store
}
