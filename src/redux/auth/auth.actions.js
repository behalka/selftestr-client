import { auth } from '../actionTypes'

export const loginRequest = formValues => ({
  type: auth.LOGIN_REQ,
  payload: { formValues },
})

export const loginSuccess = userAuth => ({
  type: auth.LOGIN_RES,
  payload: { userAuth },
})

export const logoutRequest = () => ({
  type: auth.LOGOUT_REQ,
})

export const registerReq = userData => ({
  type: auth.REGISTER_REQ,
  payload: { userData },
})

export const registerRes = userAuth => ({
  type: auth.REGISTER_RES,
  payload: { userAuth },
})

export const registerFail = () => ({
  type: auth.REGISTER_FAIL,
})

export const recoverFromTokenReq = () => ({
  type: auth.TOKEN_RECOVER_REQ,
})

export const recoverFromTokenFail = () => ({
  type: auth.TOKEN_RECOVER_FAIL,
})

export const recoverFromTokenRes = userAuth => ({
  type: auth.TOKEN_RECOVER_RES,
  payload: { userAuth },
})
