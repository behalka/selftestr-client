import { takeEvery, delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import * as actions from '../actionTypes'
import * as selectors from './tests.selectors'
import { saveTestEntities, saveTestDetailEntities } from '../entities/entities.actions'
import Api from '../../api'

// ----- Normalizr definitions
const testSchema = new schema.Entity('tests')
const testListSchema = [testSchema]
// test detail
const commentSchema = new schema.Entity('comments')
const testDetailSchema = new schema.Entity('testDetails', {
  comments: [commentSchema],
})

/*
 * Updates a test detail or creates a complete test in the store
 */
function * getTestDetail(action) {
  try {
    yield delay(2000)
    const { id } = action.payload
    const selectedTest = yield select(selectors.getTestById, id)
    if (!selectedTest) {
      const test = yield call(Api.getTestById, id)
      const normalized = normalize(test, testDetailSchema)
      console.log(normalized.entities)
      yield put(saveTestDetailEntities(normalized.entities.testDetails))
      // todo: stejny problem jako predtim vlastne -> unikatnost klicu v items poli
      yield put({ type: actions.tests.GET_TEST_RES, payload: [normalized.result] })
    } else {
      // todo: uz by tam mel byt, ale jen pro jistotu ... zase duplicity
      // yield put({ type: actions.tests.GET_TEST_RES, payload: [selectedTest.id] })
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

    const normalized = normalize(tests, testListSchema)
    yield put(saveTestEntities(normalized.entities.tests))
    yield put({ type: actions.tests.LIST_RES, payload: normalized.result })
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
