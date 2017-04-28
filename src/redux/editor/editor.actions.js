import { editor } from '../actionTypes'

export const initEditor = testModelId => ({
  type: editor.INIT_REQ,
  payload: { testModelId },
})

export const createTestModel = () => ({
  type: editor.CREATE_TEST_MODEL,
})

export const selectTestModel = testModelId => ({
  type: editor.SET_TEST_REQ,
  payload: { testModelId },
})

export const clearEditor = () => ({
  type: editor.CLEAR,
})

export const clearQuestion = () => ({
  type: editor.CLEAR_QUESTION,
})

export const clearForm = () => ({
  type: editor.CLEAR_FORM,
})

export const displayGeneral = () => ({
  type: editor.DISPLAY_GENERAL,
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

export const deleteTestFromEditor = (testModelId, isTestModelNew, router) => ({
  type: editor.DELETE_TEST_MODEL,
  payload: { testModelId, isTestModelNew, router },
})
