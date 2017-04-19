import { editor } from '../actionTypes'

export const initEditor = testModelId => ({
  type: editor.INIT_REQ,
  payload: { testModelId },
})

export const clearEditor = () => ({
  type: editor.CLEAR,
})

export const clearQuestion = () => ({
  type: editor.CLEAR_QUESTION,
})

export const selectQuestion = questionModelId => ({
  type: editor.SET_QUESTION_REQ,
  payload: { questionModelId },
})

export const selectNewQuestion = questionModelId => ({
  type: editor.SET_NEW_QUESTION_REQ,
  payload: { questionModelId },
})

export const formChanged = isFormChanged => ({
  type: editor.FORM_WAS_CHANGED,
  payload: { isFormChanged },
})
