import { combineReducers } from 'redux'
import testsReducer from './testModels/tests.reducer'
import entitiesReducer from './entities/entities.reducer'
import tagsReducer from './tags/tags.reducer'

export default combineReducers({
  entities: entitiesReducer,
  tags: tagsReducer,
  tests: testsReducer,
})
