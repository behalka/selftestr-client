import { takeLatest } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { auth } from '../actionTypes'
import {
  loginSuccess,
  loginFail,
  recoverFromTokenRes,
  recoverFromTokenFail,
  registerRes,
  registerFail } from './auth.actions'
import { addNotificationReq } from '../appState/appState.actions'
import { types as notifTypes } from '../../constants/notifications'
import * as client from '../restClientSaga'
import Api from '../../api'

function * login(action) {
  const { formValues, router } = action.payload
  try {
    // poskytnu username a password
    const { user, token } = yield client.apiCall(Api.login, formValues)
    client.storeToken(token)
    yield put(loginSuccess(user))
    yield router.push('/editor')
    yield put(addNotificationReq('Byl jste úspěšně přihlášen!', notifTypes.SUCCESS))
  } catch (err) {
    console.log(err.response)
    yield put(loginFail())
    yield put(addNotificationReq('Nesprávně zadané jméno nebo heslo.', notifTypes.ERROR))
  }
}

function * register(action) {
  const { userData, router } = action.payload
  try {
    const { user, token } = yield client.apiCall(Api.createUser, userData)
    client.storeToken(token)
    yield put(registerRes(user))
    yield router.push('/editor')
    yield put(addNotificationReq('Byl jste úspěšně zaregistrován!', notifTypes.SUCCESS))
  } catch (err) {
    yield put(registerFail())
    if (err.response && err.response.status === 409) {
      yield put(addNotificationReq('Uživatelské jméno nebo email je již zaregistrovaný.', notifTypes.ERROR))
    } else {
      yield put(addNotificationReq('Registrace se nezdařila.', notifTypes.ERROR))
    }
    console.log(err)
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

export function * registerWatcher() {
  yield takeLatest(auth.REGISTER_REQ, register)
}

// todo: tohle potrebuje mnohem rozsahlejsi refaktoring, muze nastat spousta okolnosti
// export function * loginFlow() {
//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     // fixme: tohle nefunguje spravne, login_req muze selhat a k logout se to vubec nedostane
//     let action = yield take(auth.LOGIN_REQ)
//     yield login(action)
//     action = yield take(auth.LOGIN_FAIL)
//     console.log(action, 'fail')
//     action = yield take(auth.LOGOUT_REQ, logout)
//     yield logout(action)
//   }
// }

export function * loginWatcher() {
  yield takeLatest(auth.LOGIN_REQ, login)
}

export function * logoutWatcher() {
  yield takeLatest(auth.LOGOUT_REQ, logout)
}

export default function * () {
  yield [
    authFromTokenWatcher(),
    loginWatcher(),
    logoutWatcher(),
    registerWatcher(),
  ]
}
