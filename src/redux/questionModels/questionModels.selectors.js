export const getQuestionsByTest = (state, testId) => {
  const { entities, questionModels } = state
  const ref = questionModels.questionsPerTest[testId]
  const result = ref
  ? ref.map(questionId => entities.questionModels[questionId])
  : []
  return result
}

export const getQuestionById = (state, questionId) => {
  if (!questionId) {
    return null
  }
  return state.entities.questionModels[questionId]
}
