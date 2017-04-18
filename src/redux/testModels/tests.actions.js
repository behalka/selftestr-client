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
