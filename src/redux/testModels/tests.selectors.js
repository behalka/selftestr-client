import { createSelector } from 'reselect'
import { getCommentsByTest } from '../comments/comments.selectors'
import { getTagsByTest } from '../tags/tags.selectors'
import { getUserById } from '../users/users.selectors'
import { getQuestionsByTest } from '../questionModels/questionModels.selectors'

export const getTestsData = state => state.tests.data

// export const getTestFromParams = createSelector(
//   [getTestIdFromParams], 
//   id => 
//    => tests.find(test => test.id === id)
// )

export const getTestDetail = (state, id) => {
  let test = state.entities.testDetails[id]
  if (test) {
    test = test.set('comments', getCommentsByTest(state, id))
    .set('tags', getTagsByTest(state, id))
    .set('user', getUserById(state, test.user))
  }
  return test
}
export const getTestFromParams = (state, props) => getTestDetail(state, props.params.test_id)

/*
 * Obsahuje zatim jen hlavicku, pak muzeme pridat i detail + otazky
 * Nebo to dat do trech ruznych funkci.
 */
export const getTestHeaders = state => ({
  isFetching: state.tests.testHeaders.isFetching,
  items: state.tests.testHeaders.items.map(testId => {
    let test = state.entities.tests[testId]
    test = test.set('tags', getTagsByTest(state, testId))
            .set('user', getUserById(state, test.user))
    return test
  }),
})

export const getTestsByOwner = state => ({
  isFetching: state.tests.testsOfOwner.isFetching,
  fetched: state.tests.testsOfOwner.fetched,
  items: state.tests.testsOfOwner.items.map(testId => {
    let test = state.entities.testsWithQuestions[testId]
    test = test.set('questionModels', getQuestionsByTest(state, testId))
    return test
  }),
})
