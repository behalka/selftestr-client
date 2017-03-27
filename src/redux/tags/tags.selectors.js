export const getPopularTags = state => ({
  isFetching: state.tags.popularTags.isFetching,
  items: state.tags.popularTags.items
    .map(tagId => state.entities.tags[tagId]),
})

