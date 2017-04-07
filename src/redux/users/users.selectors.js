export const getUserById = (state, userId) => {
  const { entities } = state
  return entities.users[userId]
}
