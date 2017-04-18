import { takeEvery } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import { editor } from '../actionTypes'
import * as client from '../restClientSaga'
import Api from '../../api'

function * initEditor(action) {
  console.log(action)
}

function * selectQuestion(action) {
  console.log('select', action)
}

export function * editorFlow() {
  while (true) {
    let action = yield take(editor.INIT_REQ)
    yield initEditor(action)
    // spis neco obecnejsiho jako "leave"
    action = yield take(editor.CLEAR)
  }
}

export function * selectQuestionWatcher() {
  yield takeEvery(editor.SET_QUESTION_REQ, selectQuestion)
}

export default function * () {
  yield [
    editorFlow(),
    selectQuestionWatcher(),
  ]
}
