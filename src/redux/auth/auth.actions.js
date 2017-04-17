import { auth } from '../actionTypes'

export const loginRequest = formValues => ({
  type: auth.LOGIN_REQ,
  payload: { formValues },
})

export const loginSuccess = (userAuth, token) => ({
  type: auth.LOGIN_RES,
  payload: {
    userAuth,
    token,
  },
})

export const logoutRequest = () => ({
  type: auth.LOGOUT_REQ,
})
