
const prefix = 'TESTS'
export const tests = {
  LIST_REQ: `${prefix}/LIST_REQ`,
  LIST_RES: `${prefix}/LIST_RES`,
  LIST_FAIL: `${prefix}/LIST_FAIL`,
  GET_TEST_REQ: `${prefix}/GET_TEST_REQ`,
  GET_TEST_RES: `${prefix}/GET_TEST_RES`,
  UPDATE_TEST_DETAIL_RES: `${prefix}/UPDATE_TEST_DETAIL_RES`,
  GET_TEST_FAIL: `${prefix}/GET_TEST_FAIL`,
}

export const tags = {
  FETCH_POPULAR_REQ: 'TAGS/FETCH_POPULAR_REQ',
  FETCH_POPULAR_RES: 'TAGS/FETCH_POPULAR_RES',
  FETCH_POPULAR_FAIL: 'TAGS/FETCH_POPULAR_FAIL',
  SET_PER_TEST: 'TAGS/SET_PER_TEST',
}

/* po pouziti normalizr by stacil jeden typ akce ktera by obsahovala "rozpadnute" entity
 podle schemat */
export const entities = {
  MERGE_ENTITIES: 'ENTITIES/MERGE_ENTITIES',
  MERGE_COMMENTS: 'ENTITIES/MERGE_COMMENTS',
  MERGE_USERS: 'ENTITIES/MERGE_USERS',
  MERGE_TESTS: 'ENTITIES/MERGE_TESTS',
  MERGE_TEST_DETAILS: 'ENTITIES/MERGE_TEST_DETAILS',
  MERGE_TAGS: 'ENTITIES/MERGE_TAGS',
}
