import { createSelector } from 'reselect'

export const getTestsData = state => state.tests.data

/*
 * Vrati testDetail
 */
export const getTestById = (state, id) => state.entities.testDetails[id]
export const getTestFromParams = (state, props) => getTestById(state, props.params.test_id)

/* reselect memoized selectors */

// export const getTestFromParams = createSelector(
//   [getTestIdFromParams], 
//   id => 
//    => tests.find(test => test.id === id)
// )

/*
 * Obsahuje zatim jen hlavicku, pak muzeme pridat i detail + otazky
 * Nebo to dat do trech ruznych funkci.
 */
export const getTestHeaders = state => ({
  isFetching: state.tests.testHeaders.isFetching,
  items: state.tests.testHeaders.items.map(testId => {
    const test = state.entities.tests[testId]
    return test
  }),
})
