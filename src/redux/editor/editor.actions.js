import { editor } from '../actionTypes'

export const initEditor = testModelId => ({
  type: editor.INIT_REQ,
  payload: { testModelId },
})

export const selectQuestion = questionModelId => ({
  type: editor.SET_QUESTION_REQ,
  payload: { questionModelId },
})
