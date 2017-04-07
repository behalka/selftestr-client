import { combineReducers } from 'redux'
import authReducer from './auth/auth.reducer'
import testsReducer from './testModels/tests.reducer'
import entitiesReducer from './entities/entities.reducer'
import tagsReducer from './tags/tags.reducer'
import commentsReducer from './comments/comments.reducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  auth: authReducer,
  comments: commentsReducer,
  entities: entitiesReducer,
  form: formReducer,
  tags: tagsReducer,
  tests: testsReducer,
})
