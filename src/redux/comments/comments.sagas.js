import { delay } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { comments } from '../actionTypes'
import { schema, normalize } from 'normalizr'
import { saveEntities } from '../entities/entities.actions'
import { addCommentRes, setCommentsByTest } from './comments.actions'
import { authApiCall } from '../restClientSaga'
import v4 from 'uuid'

import Api from '../../api'

const commentSchema = new schema.Entity('comments')

function * addComment(action) {
  const { testId } = action.payload
  try {
    const comment = {
      id: v4(),
      text: action.payload.text,
    }
    yield authApiCall(Api.addComment, { comment, testModelId: testId })
    comment.user = action.payload.author
    const normalized = normalize(comment, commentSchema)
    yield put(addCommentRes(comment))
    yield put(saveEntities(normalized))
    yield put(setCommentsByTest(testId, [comment.id]))
  } catch (err) {
    console.log(err)
    yield put({ type: comments.ADD_FAIL })
  }
}

function * addCommentFlow() {
  while (true) {
    const action = yield take(comments.ADD_REQ)
    yield addComment(action)
  }
}

export default function * () {
  yield [
    addCommentFlow(),
  ]
}
