import { call, select } from 'redux-saga/effects'

const tokenSelector = state => state.auth.token

export function * authApiCall(instance, payload) {
  const token = yield select(tokenSelector)
  if (!token) {
    throw new Error('Token not set.')
  }
  const res = yield call(instance, { token, payload })
  return res.data
}
export function * apiCall(instance, payload) {
  const res = yield call(instance, payload)
  return res.data
}
