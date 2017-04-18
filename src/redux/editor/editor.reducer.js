import immutable from 'seamless-immutable'
import { editor } from '../actionTypes'

const initialState = immutable({
  testModelId: null,
  questionModelId: null,
})

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case editor.INIT_REQ:
      return state
        .set('testModelId', action.payload.testModelId)
    case editor.CLEAR:
      return initialState
    default:
      return state
  }
}
