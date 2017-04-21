import immutable from 'seamless-immutable'
import { auth } from '../actionTypes'

const initialState = immutable({
  user: null,
  isLogged: false,
  isFetching: false,
})

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case auth.TOKEN_RECOVER_REQ:
    case auth.LOGIN_REQ:
      return state
        .set('isFetching', true)
    case auth.TOKEN_RECOVER_FAIL:
    case auth.LOGIN_FAIL:
      return state
        .set('isFetching', false)
        .set('isLogged', false)
    case auth.TOKEN_RECOVER_RES:
    case auth.LOGIN_RES:
      return state
        .set('isFetching', false)
        .set('isLogged', true)
        .set('user', action.payload.userAuth)
    case auth.LOGOUT_REQ:
      return state
        .set('isLogged', false)
        .set('user', null)
    default:
      return state
  }
}

