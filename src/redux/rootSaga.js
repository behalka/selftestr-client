import testsSaga from './testModels/tests.sagas'
import tagsSaga from './tags/tags.sagas'
import commentsSaga from './comments/comments.sagas'
import authSagas from './auth/auth.sagas'
import appStateSagas from './appState/appState.sagas'
import editorSagas from './editor/editor.sagas'

export default function * rootSaga() {
  yield [
    appStateSagas(),
    authSagas(),
    commentsSaga(),
    editorSagas(),
    tagsSaga(),
    testsSaga(),
  ]
}
