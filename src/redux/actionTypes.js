
const prefix = 'TESTS'
export const tests = {
  LIST_REQ: `${prefix}/LIST_REQ`,
  LIST_RES: `${prefix}/LIST_RES`,
  LIST_FAIL: `${prefix}/LIST_FAIL`,
  GET_TEST_REQ: `${prefix}/GET_TEST_REQ`,
  GET_TEST_RES: `${prefix}/GET_TEST_RES`,
  UPDATE_TEST_DETAIL_RES: `${prefix}/UPDATE_TEST_DETAIL_RES`,
  GET_TEST_FAIL: `${prefix}/GET_TEST_FAIL`,
  LIST_USER_REQ: `${prefix}/LIST_USER_REQ`,
  LIST_USER_RES: `${prefix}/LIST_USER_RES`,
  LIST_USER_FAIL: `${prefix}/LIST_USER_FAIL`,
  SAVE_TEST_REQ: `${prefix}/SAVE_TEST_REQ`,
  SAVE_TEST_RES: `${prefix}/SAVE_TEST_RES`,
  SAVE_TEST_FAIL: `${prefix}/SAVE_TEST_FAIL`,
  CREATE_TEST_RES: `${prefix}/CREATE_TEST_RES`,
  CREATE_TEST_REQ: `${prefix}/CREATE_TEST_REQ`,
  CREATE_TEST_FAIL: `${prefix}/CREATE_TEST_FAIL`,
  DELETE_REQ: `${prefix}/DELETE_REQ`,
  DELETE_RES: `${prefix}/DELETE_RES`,
  DELETE_FAIL: `${prefix}/DELETE_FAIL`,
}

export const questionModels = {
  SET_PER_TEST: 'QUESTIONS/SET_PER_TEST',
  SAVE_QUESTION_REQ: 'QUESTIONS/SAVE_QUESTION_REQ',
  SAVE_QUESTION_RES: 'QUESTIONS/SAVE_QUESTION_RES',
  SAVE_QUESTION_FAIL: 'QUESTIONS/SAVE_QUESTION_FAIL',
  CREATE_QUESTION_REQ: 'QUESTIONS/CREATE_QUESTION_REQ',
  CREATE_QUESTION_RES: 'QUESTIONS/CREATE_QUESTION_RES',
  CREATE_QUESTION_FAIL: 'QUESTIONS/CREATE_QUESTION_FAIL',
  ADD_QUESTION_REQ: 'QUESTIONS/ADD_QUESTION_REQ',
  ADD_QUESTION_RES: 'QUESTIONS/ADD_QUESTION_RES',
  ADD_QUESTION_FAIL: 'QUESTIONS/ADD_QUESTION_FAIL',
  DELETE_QUESTION_FAIL: 'QUESTIONS/DELETE_QUESTION_FAIL',
  DELETE_QUESTION_REQ: 'QUESTIONS/DELETE_QUESTION_REQ',
  DELETE_QUESTION_RES: 'QUESTIONS/DELETE_QUESTION_RES',
}

export const editor = {
  INIT_REQ: 'EDITOR/INIT_REQ',
  INIT_RES: 'EDITOR/INIT_RES',
  CLEAR: 'EDITOR/CLEAR',
  SET_QUESTION_REQ: 'EDITOR/SET_QUESTION_REQ',
  SET_QUESTION_RES: 'EDITOR/SET_QUESTION_RES',
  SET_NEW_QUESTION_REQ: 'EDITOR/SET_NEW_QUESTION_REQ',
  FORM_WAS_CHANGED: 'EDITOR/FORM_WAS_CHANGED',
  CLEAR_QUESTION: 'EDITOR/CLEAR_QUESTION',
  CLEAR_FORM: 'EDITOR/CLEAR_FORM',
  DISPLAY_GENERAL: 'EDITOR/DISPLAY_GENERAL',
  CREATE_TEST_MODEL: 'EDITOR/CREATE_TEST_MODEL',
  DELETE_TEST_MODEL: 'EDITOR/DELETE_TEST_MODEL',
}

export const appState = {
  DISPLAY_ERROR_MESSAGE: 'APPSTATE/DISPLAY_ERROR_MESSAGE',
  HIDE_NOTIFICATION: 'APPSTATE/HIDE_NOTIFICATION',
  SHOW_NOTIFICATION_RES: 'APPSTATE/SHOW_NOTIFICATION_RES',
  SHOW_NOTIFICATION_REQ: 'APPSTATE/SHOW_NOTIFICATION_REQ',
}

export const comments = {
  SET_PER_TEST: 'COMMENTS/SET_PER_TEST',
  ADD_REQ: 'COMMENTS/ADD_REQ',
  ADD_RES: 'COMMENTS/ADD_RES',
  ADD_FAIL: 'COMMENTS/ADD_FAIL',
}

export const tags = {
  FETCH_POPULAR_REQ: 'TAGS/FETCH_POPULAR_REQ',
  FETCH_POPULAR_RES: 'TAGS/FETCH_POPULAR_RES',
  FETCH_POPULAR_FAIL: 'TAGS/FETCH_POPULAR_FAIL',
  SET_PER_TEST: 'TAGS/SET_PER_TEST',
}

export const entities = {
  MERGE_ENTITIES: 'ENTITIES/MERGE_ENTITIES',
  DELETE_ENTITY: 'ENTITIES/DELETE_ENTITY',
}

export const auth = {
  LOGIN_REQ: 'AUTH/LOGIN_REQ',
  LOGIN_RES: 'AUTH/LOGIN_RES',
  LOGIN_FAIL: 'AUTH/LOGIN_FAIL',
  LOGOUT_REQ: 'AUTH/LOGOUT_REQ',
  TOKEN_RECOVER_REQ: 'AUTH/TOKEN_RECOVER_REQ',
  TOKEN_RECOVER_RES: 'AUTH/TOKEN_RECOVER_RES',
  TOKEN_RECOVER_FAIL: 'AUTH/TOKEN_RECOVER_FAIL',
}
