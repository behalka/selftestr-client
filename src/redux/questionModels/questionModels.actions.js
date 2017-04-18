import { questionModels } from '../actionTypes'

export const setQuestionsPerTest = (testId, questionIds) => ({
  type: questionModels.SET_PER_TEST,
  payload: { testId, questionIds },
})
