export const getPopularTags = state => ({
  isFetching: state.tags.popularTags.isFetching,
  items: state.tags.popularTags.items
    .map(tagId => state.entities.tags[tagId]),
})

export const getTagsByTest = (state, testId) => {
  const { tags, entities } = state
  const ref = tags.tagsByTest[testId]
  return ref
  ? ref.map(tagId => entities.tags[tagId])
  : []
}
