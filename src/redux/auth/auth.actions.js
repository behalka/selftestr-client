import { auth } from '../actionTypes'

export const loginRequest = (formValues, router) => ({
  type: auth.LOGIN_REQ,
  payload: { formValues, router },
})

export const loginSuccess = userAuth => ({
  type: auth.LOGIN_RES,
  payload: { userAuth },
})

export const loginFail = () => ({
  type: auth.LOGIN_FAIL,
})

export const logoutRequest = () => ({
  type: auth.LOGOUT_REQ,
})

export const registerReq = (userData, router) => ({
  type: auth.REGISTER_REQ,
  payload: { userData, router },
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
