import immutable from 'seamless-immutable'
import { comments } from '../actionTypes'

const initialState = immutable({
  isSaving: false,
  commentsByTest: {},
})

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case comments.SET_PER_TEST:
      const { testId, commentIds } = action.payload
      return state
        .setIn(['commentsByTest', testId], state.commentsByTest[testId]
           ? state.commentsByTest[testId].concat(commentIds)
           : commentIds
        )
    case comments.ADD_REQ:
      return state
        .set('isSaving', true)
    case comments.ADD_RES:
    case comments.ADD_FAIL:
      return state
        .set('isSaving', false)
    default:
      return state
  }
}
