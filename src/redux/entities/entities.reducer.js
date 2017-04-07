import immutable from 'seamless-immutable'
import { entities } from '../actionTypes'

const initialState = immutable({
  tests: {},
  testDetails: {},
  tags: {},
  comments: {},
  users: {},
})

export default function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case entities.MERGE_ENTITIES:
      const { tests, testDetails, tags, comments, users } = action.payload.entities
      if (tests) {
        state = state.set('tests', state.tests.merge(tests))
      }
      if (tags) {
        state = state.set('tags', state.tags.merge(tags))
      }
      if (testDetails) {
        state = state.set('testDetails', state.testDetails.merge(testDetails))
      }
      if (comments) {
        state = state.set('comments', state.comments.merge(comments))
      }
      if (users) {
        state = state.set('users', state.users.merge(users))
      }
      return state
    default:
      return state
  }
}
