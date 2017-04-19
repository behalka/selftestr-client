import { questionModels } from '../actionTypes'

export const setQuestionsPerTest = (testId, questionIds) => ({
  type: questionModels.SET_PER_TEST,
  payload: { testId, questionIds },
})

export const saveQuestionReq = (testModelId, questionModelData, isQuestionNew) => ({
  type: questionModels.SAVE_QUESTION_REQ,
  payload: { testModelId, questionModelData, isQuestionNew },
})

export const saveQuestionRes = question => ({
  type: questionModels.SAVE_QUESTION_RES,
  payload: { question },
})

export const saveQuestionFail = () => ({
  type: questionModels.SAVE_QUESTION_FAIL,
})

export const createQuestionReq = (testModelId, questionModelData) => ({
  type: questionModels.CREATE_QUESTION_REQ,
  payload: { testModelId, questionModelData },
})
