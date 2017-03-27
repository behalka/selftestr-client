import { entities } from '../actionTypes'

export const saveTestEntities = tests => ({
  type: entities.MERGE_TESTS,
  payload: tests,
})

export const saveTestDetailEntities = testDetails => ({
  type: entities.MERGE_TEST_DETAILS,
  payload: testDetails,
})

export const savePopularTags = tags => ({
  type: entities.MERGE_TAGS,
  payload: tags,
})
