import {} from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import { editor } from '../actionTypes'
import * as client from '../restClientSaga'
import Api from '../../api'

function * initEditor(action) {
  console.log(action)
}

export function * editorFlow() {
  while (true) {
    let action = yield take(editor.INIT_REQ)
    yield initEditor(action)
    action = yield take(editor.CLEAR)
  }
}

export default function * () {
  yield [
    editorFlow(),
  ]
}
