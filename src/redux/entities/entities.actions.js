import { entities } from '../actionTypes'

export const saveEntities = entitiesPayload => ({
  type: entities.MERGE_ENTITIES,
  payload: entitiesPayload,
})
