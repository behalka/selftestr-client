import { schema } from 'normalizr'

const tagSchema = new schema.Entity('tags')
const commentSchema = new schema.Entity('comments')

export const testHeaderSchema = new schema.Entity('tests', {
  tags: [tagSchema],
})
export const testHeaderListSchema = [testHeaderSchema]

export const testDetailSchema = new schema.Entity('testDetails', {
  comments: [commentSchema],
  tags: [tagSchema],
})
