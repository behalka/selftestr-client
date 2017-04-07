import { comments } from '../actionTypes'

export const setCommentsByTest = (testId, commentIds) => ({
  type: comments.SET_PER_TEST,
  payload: { testId, commentIds },
})
