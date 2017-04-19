import immutable from 'seamless-immutable'
import { appState } from '../actionTypes'

const initialState = immutable({
  notifications: [],
  errorMessage: null,
})

export default function appStateReducer(state = initialState, action) {
  switch (action.type) {
    case appState.DISPLAY_ERROR_MESSAGE:
      return state
        .set('errorMessage', action.payload.error.message)
    case appState.SHOW_NOTIFICATION_RES:
      return state
        .set('notifications', [action.payload.message, ...state.notifications])
    case appState.HIDE_NOTIFICATION:
      return state
        .set('notifications', state.notifications
          .filter(notification => notification.uid !== action.payload.message.uid)
          )
    default:
      return state
  }
}
