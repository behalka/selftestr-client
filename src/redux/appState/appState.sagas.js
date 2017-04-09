import { delay } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { appState } from '../actionTypes'
import { hideNotification, showNotification } from './appState.actions'
import { v1 } from 'uuid'

const DISPLAY_NOTIF_TIMEOUT = 10000

/**
 * Vytvori notifikaci jen z textove zpravy
 * @param {Object} action - action creator
 */
function * displayNotification(action) {
  const input = action.payload
  const message = {
    uid: v1(),
    text: input.text,
  }
  yield put(showNotification(message))
  yield call(delay, DISPLAY_NOTIF_TIMEOUT)
  // todo: tohle se odpali pokazde, i kdyz to uzivatel zrusil uz
  yield put(hideNotification(message))
}

function * notificationFlow() {
  while (true) {
    const action = yield take(appState.SHOW_NOTIFICATION_REQ)
    yield displayNotification(action)
  }
}

export default function * () {
  yield [
    notificationFlow(),
  ]
}
