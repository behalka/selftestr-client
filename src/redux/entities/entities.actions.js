import { entities } from '../actionTypes'

export const saveEntities = entitiesPayload => ({
  type: entities.MERGE_ENTITIES,
  payload: entitiesPayload,
})
export const deleteEntity = (entityName, entityId) => ({
  type: entities.DELETE_ENTITY,
  payload: { entityName, entityId },
})
