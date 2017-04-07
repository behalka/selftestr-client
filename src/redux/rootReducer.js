import { combineReducers } from 'redux'
import testsReducer from './testModels/tests.reducer'
import entitiesReducer from './entities/entities.reducer'
import tagsReducer from './tags/tags.reducer'
import commentsReducer from './comments/comments.reducer'

export default combineReducers({
  comments: commentsReducer,
  entities: entitiesReducer,
  tags: tagsReducer,
  tests: testsReducer,
})
