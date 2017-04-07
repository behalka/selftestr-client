import { auth } from '../actionTypes'

export const loginRequest = formValues => ({
  type: auth.LOGIN_REQ,
  payload: { formValues },
})

export const loginSuccess = userAuth => ({
  type: auth.LOGIN_RES,
  payload: { userAuth },
})
