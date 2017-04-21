import { tests } from '../actionTypes'

export const fetchTestList = () => ({
  type: tests.LIST_REQ,
})

export const fetchTestById = testId => ({
  type: tests.GET_TEST_REQ,
  payload: { id: testId },
})

export const fetchByUser = () => ({
  type: tests.LIST_USER_REQ,
})

export const saveReq = (testModelData, isTestModelNew) => ({
  type: tests.SAVE_TEST_REQ,
  payload: { testModelData, isTestModelNew },
})

export const saveRes = () => ({
  type: tests.SAVE_TEST_RES,
})

export const createTestReq = router => ({
  type: tests.CREATE_TEST_REQ,
  payload: { router },
})
export const createTestRes = testModelIds => ({
  type: tests.CREATE_TEST_RES,
  payload: testModelIds,
})

export const deleteTestReq = (testModelId, isTestModelNew) => ({
  type: tests.DELETE_REQ,
  payload: { testModelId, isTestModelNew },
})

export const deleteTestRes = testModelId => ({
  type: tests.DELETE_RES,
  payload: { testModelId },
})
