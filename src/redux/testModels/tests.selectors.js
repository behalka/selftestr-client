import { createSelector } from 'reselect'

import { getCommentsByTest } from '../comments/comments.selectors'
import { getTagsByTest } from '../tags/tags.selectors'

export const getTestsData = state => state.tests.data

/*
 * Vrati testDetail
 */
// export const getTestById = (state, id) => state.entities.testDetails[id]
// export const getTestFromParams = (state, props) => getTestById(state, props.params.test_id)

/* reselect memoized selectors */

// export const getTestFromParams = createSelector(
//   [getTestIdFromParams], 
//   id => 
//    => tests.find(test => test.id === id)
// )

export const getTestDetail = (state, id) => {
  let test = state.entities.testDetails[id]
  if (test) {
    test = test.set('comments', getCommentsByTest(state, id))
    test = test.set('tags', getTagsByTest(state, id))
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
    // test = test.set('tags', state.tags.tagsByTest[testId].map(tagId => state.entities.tags[tagId]))
    return test
  }),
})
