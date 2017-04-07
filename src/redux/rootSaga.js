import testsSaga from './testModels/tests.sagas'
import tagsSaga from './tags/tags.sagas'
import authSagas from './auth/auth.sagas'

export default function * rootSaga() {
  yield [
    authSagas(),
    tagsSaga(),
    testsSaga(),
  ]
}
