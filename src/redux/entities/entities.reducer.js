import immutable from 'seamless-immutable'
import { entities } from '../actionTypes'

const initialState = immutable({
  tests: {},
  testDetails: {},
  tags: {},
})

export default function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    case entities.MERGE_TAGS:
      return state
        .set('tags', state.tags.merge(action.payload))
    case entities.MERGE_TESTS:
      return state
        .set('tests', state.tests.merge(action.payload))
    case entities.MERGE_TEST_DETAILS:
      return state
        .set('testDetails', state.testDetails.merge(action.payload))
    default:
      return state
  }
}
