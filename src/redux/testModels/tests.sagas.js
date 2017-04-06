import { takeEvery, delay } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import * as actions from '../actionTypes'
import * as selectors from './tests.selectors'
import { setTagsPerTest } from '../tags/tags.actions'
import { saveTestEntities, saveTestDetailEntities, saveEntities } from '../entities/entities.actions'
import Api from '../../api'

// ----- Normalizr definitions
const tagSchema = new schema.Entity('tags')
const testSchema = new schema.Entity('tests', {
  tags: [tagSchema],
})
const testListSchema = [testSchema]
// test detail
const commentSchema = new schema.Entity('comments')
const testDetailSchema = new schema.Entity('testDetails', {
  comments: [commentSchema],
  tags: [tagSchema],
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

    yield put(saveEntities(normalized))
    for (const test of tests) {
      yield put(setTagsPerTest(test.id, normalized.entities.tests[test.id].tags))
    }
    yield put({ type: actions.tests.LIST_RES, payload: normalized.result })
    // tests.forEach(test => {
    //   console.log(test.id)
    // })    
    // yield put(setTagsPerTest())
    // todo: save tags, user
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
