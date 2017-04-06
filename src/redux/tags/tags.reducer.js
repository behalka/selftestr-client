import immutable from 'seamless-immutable'
import { tags } from '../actionTypes'

const initialState = immutable({
  popularTags: {
    isFetching: false,
    items: [],
  },
  tagsByTest: {
    // testId: [tagId, tagId]
  },
})

export default function tagsReducer(state = initialState, action) {
  switch (action.type) {
    case tags.FETCH_POPULAR_REQ:
      return state
        .setIn(['popularTags', 'isFetching'], true)
    case tags.FETCH_POPULAR_FAIL:
      return state
        .setIn(['popularTags', 'isFetching'], false)
    case tags.FETCH_POPULAR_RES:
      return state
        .setIn(['popularTags', 'isFetching'], false)
        .setIn(['popularTags', 'items'], state.popularTags.items.concat(action.payload))
    case tags.SET_PER_TEST:
      const { testId, tagIds } = action.payload
      if (state.tagsByTest[testId]) {
        state = state.setIn(['tagsByTest', testId], state.tagsByTest[testId].concat(tagIds))
      } else {
        state = state.setIn(['tagsByTest', testId], tagIds)
      }
      return state
    default:
      return state
  }
}
