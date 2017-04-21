import { takeLatest } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { auth } from '../actionTypes'
import { loginSuccess, recoverFromTokenRes, recoverFromTokenFail } from './auth.actions'
import { addNotificationReq } from '../appState/appState.actions'
import { types as notifTypes } from '../../constants/notifications'
import * as client from '../restClientSaga'
import Api from '../../api'

function * login(action) {
  const { formValues } = action.payload
  try {
    // poskytnu username a password
    const { user, token } = yield client.apiCall(Api.login, formValues)
    client.storeToken(token)
    yield put(loginSuccess(user))
    yield put(addNotificationReq('Byl jste uspesne prihlasen!', notifTypes.SUCCESS))
  } catch (err) {
    console.log(err.response)
  }
}

function * loadAuthFromToken() {
  const user = client.getUserFromToken()
  user
  ? yield put(recoverFromTokenRes(user))
  : yield put(recoverFromTokenFail())
}

function * logout() {
  client.removeToken()
}

export function * authFromTokenWatcher() {
  yield takeLatest(auth.TOKEN_RECOVER_REQ, loadAuthFromToken)
}

export function * loginFlow() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let action = yield take(auth.LOGIN_REQ)
    yield login(action)
    action = yield take(auth.LOGOUT_REQ, logout)
    yield logout(action)
  }
}

export default function * () {
  yield [
    authFromTokenWatcher(),
    loginFlow(),
  ]
}
