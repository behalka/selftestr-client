import { takeEvery, takeLatest } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import { v1 } from 'uuid'
import { addNotificationReq } from '../appState/appState.actions'
import { types as notifTypes } from '../../constants/notifications'
import { editor, questionModels } from '../actionTypes'
import { saveEntities, deleteEntity } from '../entities/entities.actions'
import {
  setQuestionsPerTest,
  saveQuestionRes,
  saveQuestionFail,
  deleteQuestionRes,
 } from '../questionModels/questionModels.actions'
import * as editorActions from './editor.actions'
import * as client from '../restClientSaga'
import Api from '../../api'

const questionSchema = new schema.Entity('questionModels')

// todo: do utils spolecne s contentWrapper funkcema
function transformQuestionModel(question) {
  const res = Object.assign({}, question)
  delete res.updated_at
  delete res.created_at
  console.log(res, 'foo')
  return res
}

function * initEditor(action) {
  console.log(action)
}

function * selectQuestion(action) {
  console.log('select', action)
  // todo: k prepnuti by melo dojit az po overeni/ulozeni stavajici otazky
}

function * createQuestion(action) {
  const { testModelId, questionModelData: data } = action.payload
  console.log(testModelId, data, 'create q')
  // budouci questionModel se ma podobat ostatnim
  data.id = v1()
  data.answerModels = []
  const normalized = normalize(data, questionSchema)
  yield put(saveEntities(normalized))
  yield put(setQuestionsPerTest(testModelId, [data.id]))
  yield put(editorActions.selectNewQuestion(data.id))
}

function * addQuestion(action) {
  const { testModelId, questionModelData } = action.payload
  try {
    const result = yield client.authApiCall(Api.createQuestion, {
      testModelId,
      questionModel: transformQuestionModel(questionModelData),
    })
    const normalized = normalize(result, questionSchema)
    yield put(saveEntities(normalized))
  } catch (err) {
    console.log(err.response)
    yield put({ type: questionModels.SAVE_QUESTION_FAIL })
  }
}

function * updateQuestion(action) {
  const { testModelId, questionModelData } = action.payload
  try {
    const result = yield client.authApiCall(Api.updateQuestion, {
      testModelId,
      questionModelId: questionModelData.id,
      questionModel: transformQuestionModel(questionModelData),
    })
    const normalized = normalize(result, questionSchema)
    yield put(saveEntities(normalized))
  } catch (err) {
    console.log(err.response)
    yield put({ type: questionModels.SAVE_QUESTION_FAIL })
  }
}

// todo: removeQuestion - z questionModels, entities - delete metodu na entities!

function * saveQuestion(action) {
  const { isQuestionNew } = action.payload
  try {
    isQuestionNew
    ? yield addQuestion(action)
    : yield updateQuestion(action)
    yield put(saveQuestionRes())
    yield put(addNotificationReq('Otázka byla uložena.', notifTypes.SUCCESS))
  } catch (err) {
    console.log(err, err.response)
    yield put(saveQuestionFail())
    // provolat error message panel
    yield put(addNotificationReq('Otázka nemohla být uložena.', notifTypes.WARNING))
  }
}

function * deleteQuestion(action) {
  const { isQuestionNew, testModelId, questionModelId } = action.payload
  try {
    if (!isQuestionNew) {
      yield client.authApiCall(Api.deleteQuestion, {
        testModelId,
        questionModelId,
      })
    }
    yield put(deleteQuestionRes(testModelId, questionModelId))
    yield put(editorActions.clearQuestion())
    yield put(addNotificationReq('Otázka byla smazána', notifTypes.SUCCESS))
    yield put(deleteEntity('questionModels', questionModelId))
  } catch (err) {
    console.log(err)
    console.log(err.response)
  }
}

export function * editorFlow() {
  while (true) {
    let action = yield take(editor.INIT_REQ)
    yield initEditor(action)
    // spis neco obecnejsiho jako "leave"
    action = yield take(editor.CLEAR)
  }
}

export function * saveQuestionWatcher() {
  yield takeLatest(questionModels.SAVE_QUESTION_REQ, saveQuestion)
}

export function * createQuestionWatcher() {
  yield takeLatest(questionModels.CREATE_QUESTION_REQ, createQuestion)
}

export function * deleteQuestionWatcher() {
  yield takeLatest(questionModels.DELETE_QUESTION_REQ, deleteQuestion)
}

export function * selectQuestionWatcher() {
  yield takeEvery(editor.SET_QUESTION_REQ, selectQuestion)
}

export default function * () {
  yield [
    createQuestionWatcher(),
    deleteQuestionWatcher(),
    editorFlow(),
    selectQuestionWatcher(),
    saveQuestionWatcher(),
  ]
}
