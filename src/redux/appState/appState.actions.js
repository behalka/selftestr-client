import { appState } from '../actionTypes'

export const displayError = error => ({
  type: appState.DISPLAY_ERROR_MESSAGE,
  payload: { error },
})

export const addNotificationReq = text => ({
  type: appState.SHOW_NOTIFICATION_REQ,
  payload: { text },
})

export const showNotification = message => ({
  type: appState.SHOW_NOTIFICATION_RES,
  payload: { message },
})

export const hideNotification = message => ({
  type: appState.HIDE_NOTIFICATION,
  payload: { message },
})
