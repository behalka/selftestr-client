import immutable from 'seamless-immutable'
import { entities } from '../actionTypes'

const initialState = immutable({
  tests: {},
  testDetails: {},
  testsWithQuestions: {},
  questionModels: {},
  tags: {},
  comments: {},
  users: {},
})

export default function entitiesReducer(state = initialState, action) {
  switch (action.type) {
    // eslint-disable-next-line no-case-declarations
    case entities.MERGE_ENTITIES:
      const {
        tests,
        testDetails,
        tags,
        comments,
        users,
        questionModels,
        testsWithQuestions,
      } = action.payload.entities
      if (tests) {
        state = state.set('tests', state.tests.merge(tests))
      }
      if (tags) {
        state = state.set('tags', state.tags.merge(tags))
      }
      if (testDetails) {
        state = state.set('testDetails', state.testDetails.merge(testDetails))
      }
      if (testsWithQuestions) {
        state = state.set('testsWithQuestions', state.testsWithQuestions.merge(testsWithQuestions))
      }
      if (comments) {
        state = state.set('comments', state.comments.merge(comments))
      }
      if (questionModels) {
        state = state.set('questionModels', state.questionModels.merge(questionModels))
      }
      if (users) {
        state = state.set('users', state.users.merge(users))
      }
      return state
    default:
      return state
  }
}
