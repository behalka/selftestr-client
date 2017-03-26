import { combineReducers } from 'redux'
import testsReducer from './testsOverview/tests.reducer'
import entitiesReducer from './entities/entities.reducer'

export default combineReducers({
  entities: entitiesReducer,
  tests: testsReducer,
})
