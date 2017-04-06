import { tags } from '../actionTypes'

export const fetchPopularTags = () => ({
  type: tags.FETCH_POPULAR_REQ,
})

export const setTagsPerTest = (testId, tagIds) => ({
  type: tags.SET_PER_TEST,
  payload: { testId, tagIds },
})
