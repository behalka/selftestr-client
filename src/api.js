import _ from 'lodash'
import axios from 'axios'
/* eslint-disable camelcase */

const tagObjects = {
  'd27e46fc-e3ae-43ee-8a00-96db74ce6851': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ce6851',
    text: 'Autoškola',
  },
  'd27e46fc-e3ae-43ee-8a00-96db74ce6853': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ce6853',
    text: 'Harry Potter',
  },
  'd27e46fc-e3ae-43ee-8a00-96db74ce6866': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ce6866',
    text: 'Specialni tag1',
  },
  'd27e46fc-e3ae-43ee-8a00-96db74ce6867': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ce6876',
    text: 'Specialni tag2',
  },
}

const userObjects = {
  'd27e46fc-e3ae-43ee-8a00-96db74ceabab': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ceabab',
    username: 'Behalkar',
  },
  'd27e46fc-e3ae-43ee-8a00-96db74ceabac': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ceabac',
    username: 'Kalinja',
  },
}

const commentObjects = {
  'd27e46fc-e3ae-43ee-8a00-96db74ceacac': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ceacac',
    author: _.values(userObjects)[0],
    text: 'Hello there',
  },
  'd27e46fc-e3ae-43ee-8a00-96db74ceadad': {
    id: 'd27e46fc-e3ae-43ee-8a00-96db74ceadad',
    author: _.values(userObjects)[1],
    text: 'A second comment',
  },
}

const testObjects = {
  'e646295e-a5f4-41c4-89ad-6258de0df130': {
    id: 'e646295e-a5f4-41c4-89ad-6258de0df130',
    name: 'Znalosti o přežvýkavcích',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: [
      _.values(tagObjects)[2],
      _.values(tagObjects)[3],
    ],
    author: _.values(userObjects)[0],
    comments: _.values(commentObjects),
    ranking: {
      value: 4.7,
      count: 123,
    },
  },
}

const testDetail = _.omit(_.values(testObjects)[0], 'comments')

const URL = 'http://localhost:3000'

export default {
  getUser: () => Promise.resolve({
    user,
    token: TOKEN,
  }),
  login: payload => axios
    .post(`${URL}/login`, payload),
  // listTests: () => Promise.resolve([testDetail]),
  listTests: () => axios
    .get(`${URL}/testModels`),
  listTestsOfUser: ({ token }) => axios
    .get(`${URL}/editor/`, {
      headers: { Authorization: token },
    }),
  getPopularTags: () => Promise.resolve([_.values(tagObjects)[0]]),
  getTestById: ({ id }) => axios
    .get(`${URL}/testModels/${id}`),
  createQuestion: ({ payload, token }) => axios
    .post(`${URL}/editor/${payload.testModelId}/questions`,
    payload.questionModel,
    {
      headers: {
        Authorization: token,
      },
    }),
  updateQuestion: ({ payload, token }) => axios
    .patch(`${URL}/editor/${payload.testModelId}/questions/${payload.questionModelId}`,
    payload.questionModel,
    {
      headers: {
        Authorization: token,
      },
    }),
  addComment: ({ payload, token }) => axios
    .post(`${URL}/testModels/${payload.testModelId}/comments`,
      payload.comment, {
        headers: { Authorization: token },
      }),
}
