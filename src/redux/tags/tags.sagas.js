import { takeEvery, delay, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { schema, normalize } from 'normalizr'
import * as actions from '../actionTypes'
import * as selectors from './tags.selectors'
import { saveEntities } from '../entities/entities.actions'
import Api from '../../api'

// normalizr schema
const tagSchema = new schema.Entity('tags')
const tagListSchema = [tagSchema]

function * getPopularTags() {
  try {
    yield delay(500)
    const tags = yield call(Api.getPopularTags, {})
    const normalized = normalize(tags, tagListSchema)
    yield put(saveEntities(normalized))
    yield put({ type: actions.tags.FETCH_POPULAR_RES, payload: normalized.result })
  } catch (err) {
    yield put({ type: actions.tags.FETCH_POPULAR_FAIL, err })
  }
}

function * getPopularTagsWatcher() {
  yield takeLatest(actions.tags.FETCH_POPULAR_REQ, getPopularTags)
}

export default function * () {
  yield [
    getPopularTagsWatcher(),
  ]
}

