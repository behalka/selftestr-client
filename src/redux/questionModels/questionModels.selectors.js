export const getQuestionsByTest = (state, testId) => {
  const { entities, questionModels } = state
  const ref = questionModels.questionPerTest[testId]
  const result = ref
  ? ref.map(questionId => entities.questionModels[questionId])
  : []
  return result
}
