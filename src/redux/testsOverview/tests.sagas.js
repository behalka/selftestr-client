import { takeEvery, delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import * as actions from '../actionTypes'
import * as selectors from './tests.selectors'
import { saveTestEntities, saveTestDetailEntities } from '../entities/entities.actions'
import Api from '../../api'

/*
 * Updates a test detail or creates a complete test in the store
 */
function * getTestDetail(action) {
  try {
    yield delay(2000)
    const { id } = action.payload
    const selectedTest = yield select(selectors.getTestById, id)
    if (!selectedTest) {
      const test = yield call(Api.getTestById, { id })
      const testObj = { [test.id]: test }
      yield put(saveTestDetailEntities(testObj))
      // todo: stejny problem jako predtim vlastne -> unikatnost klicu v items poli
      yield put({ type: actions.tests.GET_TEST_RES, payload: [test.id] })
    } else {
      // todo: uz by tam mel byt, ale jen pro jistotu ... zase duplicity
      yield put({ type: actions.tests.GET_TEST_RES, payload: [selectedTest.id] })
    }
  } catch (err) {
    yield put({ type: actions.tests.GET_TEST_FAIL })
  }
}

export function * getTestDetailWatcher() {
  yield takeEvery(actions.tests.GET_TEST_REQ, getTestDetail)
}

function * getTestsList() {
  try {
    yield delay(2000)
    const tests = yield call(Api.listTests, {})

    // todo: do testReducer poslat jen idcka
    // todo: do entitiesReducer poslat objekty { id: { obj ... }}
    const testMap = tests.map(test => {
      return { [test.id]: test }
    })
    yield put(saveTestEntities(testMap))
    const testKeys = tests.map(test => test.id)
    yield put({ type: actions.tests.LIST_RES, payload: testKeys })
  } catch (err) {
    yield put({ type: actions.tests.LIST_FAIL, err })
  }
}

export function * getTestsListWatcher() {
  yield takeEvery(actions.tests.LIST_REQ, getTestsList)
}

export default function * () {
  yield [
    getTestsListWatcher(),
    getTestDetailWatcher(),
  ]
}
