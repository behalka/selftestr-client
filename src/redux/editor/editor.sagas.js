import { takeEvery, takeLatest } from 'redux-saga'
import { take, call, put, select } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import { v1 } from 'uuid'
import { addNotificationReq } from '../appState/appState.actions'
import { getAuth } from '../auth/auth.selectors'
import { types as notifTypes } from '../../constants/notifications'
import questionTypes from '../../constants/questionTypes'
import { editor, questionModels, tests } from '../actionTypes'
import { saveEntities, deleteEntity } from '../entities/entities.actions'
import {
  setQuestionsPerTest,
  saveQuestionRes,
  saveQuestionFail,
  deleteQuestionRes,
 } from '../questionModels/questionModels.actions'
import * as editorActions from './editor.actions'
import * as client from '../restClientSaga'
import * as testActions from '../testModels/tests.actions'
import Api from '../../api'

const questionSchema = new schema.Entity('questionModels')
const testModelSchema = new schema.Entity('testsWithQuestions')

// todo: do utils spolecne s contentWrapper funkcema
function transformQuestionModel(question) {
  const res = Object.assign({}, question)
  delete res.updated_at
  delete res.created_at
  return res
}

function initQuestionModel(question) {
  question.id = v1()
  question.answerModels = []
  switch (question.type) {
    case questionTypes.text_input.id:
      question.answerModels.push({
        id: v1(),
        isCorrect: true,
      })
      return question
    case questionTypes.multichoice.id:
      for (let i = 0; i < 3; i++) {
        question.answerModels.push({ id: v1() })
      }
      return question
    case questionTypes.singlechoice.id:
      for (let i = 0; i < 3; i++) {
        question.answerModels.push({ id: v1() })
      }
      question.answerModels[0].isCorrect = true
      return question
    default: throw new Error('Missing question.type param')
  }
}

function * initEditor(action) {
  console.log(action)
}

function * selectQuestion(action) {
  console.log('select', action)
  // todo: k prepnuti by melo dojit az po overeni/ulozeni stavajici otazky
}

function * createTestModel(action) {
  // action.payload.ownerId is set
  const testModel = {
    id: v1(),
  }
  const normalized = normalize(testModel, testModelSchema)
  yield put(saveEntities(normalized))
  yield put(setQuestionsPerTest(testModel.id, []))
  yield put(testActions.createTestRes([testModel.id]))
  yield put(editorActions.createTestModel())
  const { router } = action.payload
  yield router.push(`/editor/${testModel.id}`)
}

function * createQuestion(action) {
  const { testModelId, questionModelData } = action.payload
  // budouci questionModel se ma podobat ostatnim
  const data = initQuestionModel(questionModelData)
  console.log(testModelId, data, 'create q')
  const normalized = normalize(data, questionSchema)
  yield put(saveEntities(normalized))
  yield put(setQuestionsPerTest(testModelId, [data.id]))
  yield put(editorActions.selectNewQuestion(data.id))
}

function * addQuestion(action) {
  const { testModelId, questionModelData } = action.payload
  console.log('add')
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
  console.log('update')
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

function * saveQuestion(action) {
  const { isQuestionNew } = action.payload
  try {
    isQuestionNew
    ? yield addQuestion(action)
    : yield updateQuestion(action)
    yield put(saveQuestionRes())
    yield put(addNotificationReq('Otázka byla uložena.', notifTypes.SUCCESS))
    // po uspesnem ulozeni (ktere se zavola po uspesnem submitu) chceme vyjet nahoru
    window.scrollTo(0, 0)
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

function * deleteTestFromEditorFlow() {
  while (true) {
    let action = yield take(editor.DELETE_TEST_MODEL)
    const { router, isTestModelNew, testModelId } = action.payload
    // todo: melo by se to forknout
    yield put(testActions.deleteTestReq(testModelId, isTestModelNew))
    action = yield take(tests.DELETE_RES)
    yield router.push('/editor')
    yield put(editorActions.clearEditor())
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

export function * createTestWatcher() {
  yield takeLatest(tests.CREATE_TEST_REQ, createTestModel)
}

export function * deleteQuestionWatcher() {
  yield takeLatest(questionModels.DELETE_QUESTION_REQ, deleteQuestion)
}

export function * selectQuestionWatcher() {
  yield takeEvery(editor.SET_QUESTION_REQ, selectQuestion)
}

export default function * () {
  yield [
    createTestWatcher(),
    createQuestionWatcher(),
    deleteQuestionWatcher(),
    deleteTestFromEditorFlow(),
    editorFlow(),
    selectQuestionWatcher(),
    saveQuestionWatcher(),
  ]
}
