import { combineReducers } from 'redux'
import appStateReducer from './appState/appState.reducer'
import authReducer from './auth/auth.reducer'
import testsReducer from './testModels/tests.reducer'
import entitiesReducer from './entities/entities.reducer'
import tagsReducer from './tags/tags.reducer'
import commentsReducer from './comments/comments.reducer'
import questionModelsReducer from './questionModels/questionModels.reducer'
import editorReducer from './editor/editor.reducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  appState: appStateReducer,
  auth: authReducer,
  comments: commentsReducer,
  editor: editorReducer,
  entities: entitiesReducer,
  form: formReducer,
  questionModels: questionModelsReducer,
  tags: tagsReducer,
  tests: testsReducer,
})
