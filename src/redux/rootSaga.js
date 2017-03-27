import testsSaga from './testsOverview/tests.sagas'
import tagsSaga from './tags/tags.sagas'

export default function * rootSaga() {
  yield [
    tagsSaga(),
    testsSaga(),
  ]
}
