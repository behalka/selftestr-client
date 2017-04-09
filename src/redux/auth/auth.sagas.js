import { call, put, take } from 'redux-saga/effects'
import { auth } from '../actionTypes'
import { loginSuccess, logoutRequest } from './auth.actions'
import { addNotificationReq } from '../appState/appState.actions'
import { types as notifTypes } from '../../constants/notifications'
import Api from '../../api'

function * login(action) {
  const { formValues } = action.payload
  try {
    // poskytnu username a password
    const user = yield call(Api.getUser, { formValues })
    yield put(loginSuccess(user))
    yield put(addNotificationReq('Byl jste uspesne prihlasen!', notifTypes.SUCCESS))
  } catch (err) {
    console.log(err)
  }
}

function * logout() {
  console.log('logout')
  // yield put(logoutRequest())
  // todo: moar actions jako zrusit token atd
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
    loginFlow(),
  ]
}
