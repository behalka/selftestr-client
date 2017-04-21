import { takeEvery, delay, takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import * as actions from '../actionTypes'
import * as selectors from './tests.selectors'
import { setTagsPerTest } from '../tags/tags.actions'
import { saveRes, deleteTestRes } from './tests.actions'
import { addNotificationReq } from '../appState/appState.actions'
import { types as notifTypes } from '../../constants/notifications'
import { setCommentsByTest } from '../comments/comments.actions'
import { setQuestionsPerTest } from '../questionModels/questionModels.actions'
import { saveEntities, deleteEntity } from '../entities/entities.actions'
import Api from '../../api'
import * as client from '../restClientSaga'

// ----- Normalizr definitions
const tagSchema = new schema.Entity('tags')
const userSchema = new schema.Entity('users')
const testSchema = new schema.Entity('tests', {
  tags: [tagSchema],
  user: userSchema,
})
const testListSchema = [testSchema]
// test detail
const commentSchema = new schema.Entity('comments')
const testDetailSchema = new schema.Entity('testDetails', {
  comments: [commentSchema],
  tags: [tagSchema],
  user: userSchema,
})
const questionSchema = new schema.Entity('questionModels')
const testsWithQuestionsSchema = new schema.Entity('testsWithQuestions', {
  questionModels: [questionSchema],
})
const testsOfOwnerListSchema = [testsWithQuestionsSchema]

// todo: move to utils
function transformTestToUpdate(data) {
  const testModel = Object.assign({}, data)
  delete testModel.questionModels
  delete testModel.created_at
  delete testModel.updated_at
  delete testModel.userId
  return testModel
}
function transformTestToCreate(data) {
  const testModel = Object.assign({}, data)
  return testModel
}

/*
 * Updates a test detail or creates a complete test in the store
 */
function * getTestDetail(action) {
  try {
    yield delay(2000)
    const { id } = action.payload
    const selectedTest = yield select(selectors.getTestDetail, id)
    if (!selectedTest) {
      const test = yield client.apiCall(Api.getTestById, { id })
      const normalized = normalize(test, testDetailSchema)
      yield put(saveEntities(normalized))
      // todo: stejny problem jako predtim vlastne -> unikatnost klicu v items poli
      yield put(setCommentsByTest(test.id, normalized.entities.testDetails[test.id].comments))
      yield put({ type: actions.tests.GET_TEST_RES, payload: [normalized.result] })
    } else {
      // todo: uz by tam mel byt, ale jen pro jistotu ... zase duplicity
      // yield put({ type: actions.tests.GET_TEST_RES, payload: [selectedTest.id] })
    }
  } catch (err) {
    console.log(err)
    yield put({ type: actions.tests.GET_TEST_FAIL })
  }
}

export function * getTestDetailWatcher() {
  yield takeEvery(actions.tests.GET_TEST_REQ, getTestDetail)
}

export function * getTestsOfUser() {
  try {
    const tests = yield client.authApiCall(Api.listTestsOfUser)
    const normalized = normalize(tests, testsOfOwnerListSchema)
    yield put(saveEntities(normalized))
    for (const test of tests) {
      yield put(setQuestionsPerTest(test.id,
        normalized.entities.testsWithQuestions[test.id].questionModels))
    }
    yield put({
      type: actions.tests.LIST_USER_RES,
      payload: normalized.result,
    })
  } catch (err) {
    yield put({ type: actions.tests.LIST_USER_FAIL })
  }
}

export function * getTestsOfUserWatcher() {
  // kus reduceru je provazany primo s uzivatelem
  yield takeLatest([
    actions.tests.LIST_USER_REQ,
    actions.auth.LOGIN_RES,
    actions.auth.REGISTER_RES], getTestsOfUser)
}

function * getTestsList() {
  try {
    yield delay(2000)
    const tests = yield client.apiCall(Api.listTests)
    console.log(tests)
    const normalized = normalize(tests, testListSchema)
    yield put(saveEntities(normalized))
    for (const test of tests) {
      yield put(setTagsPerTest(test.id, normalized.entities.tests[test.id].tags))
    }
    yield put({ type: actions.tests.LIST_RES, payload: normalized.result })
  } catch (err) {
    console.log(err)
    yield put({ type: actions.tests.LIST_FAIL, err })
  }
}

function * saveTestModel(action) {
  const { testModelData, isTestModelNew } = action.payload
  try {
    let result
    if (isTestModelNew) {
      result = yield client.authApiCall(Api.createTestModel, {
        testModel: transformTestToCreate(testModelData),
      })
    } else {
      result = yield client.authApiCall(Api.updateTestModel, {
        testModel: transformTestToUpdate(testModelData),
      })
    }
    const normalized = normalize(result, testsWithQuestionsSchema)
    // endpoint nevraci zpet otazky. zjistit jestli to vadi :)
    // dokud nesahame na entities.tests.questionModels tak to nevadi *_*
    yield put(saveEntities(normalized))
    yield put(saveRes())
    yield put(addNotificationReq('Nastavení bylo uloženo.', notifTypes.SUCCESS))
  } catch (err) {
    console.log(err)
    console.log(err.response)
    yield put({ type: actions.tests.SAVE_TEST_FAIL })
  }
}

function * deleteTestModel(action) {
  const { testModelId, isTestModelNew } = action.payload
  try {
    if (!isTestModelNew) {
      yield client.authApiCall(Api.deleteTest, {
        testModelId,
      })
    }
    yield put(deleteTestRes(testModelId))
    yield put(deleteEntity('testsWithQuestions', testModelId))
    yield put(addNotificationReq('Test byl smazán', notifTypes.SUCCESS))
  } catch (err) {
    console.log(err)
    console.log(err.response)
  }
}

export function * deleteTestModelWatcher() {
  yield takeLatest(actions.tests.DELETE_REQ, deleteTestModel)
}

export function * saveTestModelWatcher() {
  yield takeLatest(actions.tests.SAVE_TEST_REQ, saveTestModel)
}

export function * getTestsListWatcher() {
  yield takeEvery(actions.tests.LIST_REQ, getTestsList)
}

export default function * () {
  yield [
    deleteTestModelWatcher(),
    getTestsOfUserWatcher(),
    getTestsListWatcher(),
    getTestDetailWatcher(),
    saveTestModelWatcher(),
  ]
}
