import immutable from 'seamless-immutable'
import { auth } from '../actionTypes'

const initialState = immutable({
  user: {},
  isLogged: false,
  isFetching: false,
})

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case auth.LOGIN_REQ:
      return state
        .set('isFetching', true)
    case auth.LOGIN_FAIL:
      return state
        .set('isFetching', false)
        .set('isLogged', false)
    case auth.LOGIN_RES:
      return state
        .set('isFetching', false)
        .set('isLogged', true)
        .set('user', action.payload.userAuth)
    default:
      return state
  }
}

