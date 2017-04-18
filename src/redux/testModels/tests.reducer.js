import immutable from 'seamless-immutable'
import { tests } from '../actionTypes'
import _ from 'lodash'

const initialState = immutable({
  testHeaders: {
    isFetching: false,
    // indexy testu ktere mame ve store
    // todo: misto pole by se mozna hodila mnozina..
    items: [],
  },
  testDetails: {
    isFetching: false,
    items: [],
  },
  testsOfOwner: {
    isFetching: false,
    items: [],
  },
})

export default function testsReducer(state = initialState, action) {
  switch (action.type) {
    case tests.LIST_USER_REQ:
      return state.setIn(['testsOfOwner', 'isFetching'], true)
    case tests.LIST_USER_FAIL:
      return state.setIn(['testsOfOwner', 'isFetching'], false)
    case tests.LIST_USER_RES:
      return state
        .setIn(['testsOfOwner', 'isFetching'], false)
        .setIn(['testsOfOwner', 'items'], action.payload)
    case tests.LIST_REQ:
      return state.setIn(['testHeaders', 'isFetching'], true)
    case tests.LIST_RES:
      return state
        .setIn(['testHeaders', 'isFetching'], false)
        .setIn(['testHeaders', 'items'], action.payload)
    case tests.LIST_FAIL:
      return state
        .set('isFetching', false)
    case tests.GET_TEST_REQ:
      return state.setIn(['testDetails', 'isFetching'], true)
    case tests.GET_TEST_RES:
      return state
        .setIn(['testDetails', 'isFetching'], false)
        .setIn(['testDetails', 'items'], state.testDetails.items.concat(action.payload))
    case tests.GET_TEST_FAIL:
      return state
        .set('isFetching', false)
    default:
      return state
  }
}
