import { takeEvery, takeLatest } from 'redux-saga'
import { call, put, select } from 'redux-saga/effects'
import { auth } from '../actionTypes'
import { loginSuccess } from './auth.actions'
import Api from '../../api'

function * login(action) {
  const { formValues } = action.payload
  try {
    // poskytnu username a password
    const user = yield call(Api.getUser, { formValues })
    yield put(loginSuccess(user))
  } catch (err) {
    console.log(err)
  }
}

export function * loginWatcher() {
  yield takeLatest(auth.LOGIN_REQ, login)
}

export default function * () {
  yield [
    loginWatcher(),
  ]
}
