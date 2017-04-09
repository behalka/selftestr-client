import testsSaga from './testModels/tests.sagas'
import tagsSaga from './tags/tags.sagas'
import authSagas from './auth/auth.sagas'
import appStateSagas from './appState/appState.sagas'

export default function * rootSaga() {
  yield [
    appStateSagas(),
    authSagas(),
    tagsSaga(),
    testsSaga(),
  ]
}
