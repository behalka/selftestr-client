import { questionModels } from '../actionTypes'

export const setQuestionsPerTest = (testId, questionIds) => ({
  type: questionModels.SET_PER_TEST,
  payload: { testId, questionIds },
})

export const saveQuestionReq = (testModelId, questionModelData) => ({
  type: questionModels.SAVE_QUESTION_REQ,
  payload: { testModelId, questionModelData },
})

export const saveQuestionRes = question => ({
  type: questionModels.SAVE_QUESTION_RES,
  payload: { question },
})

export const createQuestionReq = (testModelId, questionModelData) => ({
  type: questionModels.CREATE_QUESTION_REQ,
  payload: { testModelId, questionModelData },
})

export const addQuestionReq = (testModelId, questionModelData) => ({
  type: questionModels.ADD_QUESTION_REQ,
  payload: { testModelId, questionModelData },
})
