export const getCommentsByTest = (state, testId) => {
  const { entities, comments } = state
  const ref = comments.commentsByTest[testId]
  const result = ref
  ? ref.map(commentId => entities.comments[commentId])
  : []
  return result
}
