import immutable from 'seamless-immutable'
import { questionModels } from '../actionTypes'

const initialState = immutable({
  questionsPerTest: {},
})

export default function questionModelsReducer(state = initialState, action) {
  switch (action.type) {
    case questionModels.SET_PER_TEST:
      const { testId, questionIds } = action.payload
      return state
        .setIn(['questionsPerTest', testId], state.questionsPerTest[testId]
           ? state.questionsPerTest[testId].concat(questionIds)
           : questionIds
        )
    default:
      return state
  }
}
