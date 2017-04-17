import { comments } from '../actionTypes'

export const setCommentsByTest = (testId, commentIds) => ({
  type: comments.SET_PER_TEST,
  payload: { testId, commentIds },
})

export const addCommentReq = (text, author, testId) => ({
  type: comments.ADD_REQ,
  payload: { text, author, testId },
})

export const addCommentRes = comment => ({
  type: comments.ADD_RES,
  payload: { comment },
})
