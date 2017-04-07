import { createSelector } from 'reselect'

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

// todo: jak nalozit s tim kdyz komponenty nejsou jeste poskladany? -> vlastni selektory pro kusy statu
export const getTestDetail = ({ entities, comments, tags }, id) => {
  let test = entities.testDetails[id]
  if (test) {
    const commentsOfTest = comments.commentsByTest[id]
    test = commentsOfTest
    ? test.set('comments', comments.commentsByTest[id]
      .map(commentId => entities.comments[commentId]))
    : test.set('comments', [])
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
    test = test.set('tags', state.tags.tagsByTest[testId].map(tagId => state.entities.tags[tagId]))
    return test
  }),
})
