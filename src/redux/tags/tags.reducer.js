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
    default:
      return state
  }
}
