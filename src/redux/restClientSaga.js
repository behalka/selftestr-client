import { call } from 'redux-saga/effects'
import cookie from 'react-cookie'
import jwtDecode from 'jwt-decode'

export function storeToken(token) {
  cookie.save('token', token, {
    path: '/',
    maxAge: 2 * 60 * 60,
  })
}

// fixme: tohle neresi platnost tokenu
export function getUserFromToken() {
  try {
    const token = cookie.load('token')
    if (!token) {
      return null
    }
    const res = jwtDecode(token)
    const user = {
      id: res.userId,
      username: res.username,
    }
    return user
  } catch (err) {
    return null
  }
}

export function removeToken() {
  cookie.remove('token')
}

export function * authApiCall(instance, payload) {
  const token = cookie.load('token')
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
