import testsSaga from './testsOverview/tests.sagas'

export default function * rootSaga() {
  yield [
    testsSaga(),
  ]
}
