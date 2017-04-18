import { editor } from '../actionTypes'

export const initEditor = testModelId => ({
  type: editor.INIT_REQ,
  payload: { testModelId },
})
