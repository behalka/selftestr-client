import { createSelector } from 'reselect'

// const getAuth = state => state.auth

export const getAuth = createSelector(
  [state => state.auth],
  auth => auth,
)
