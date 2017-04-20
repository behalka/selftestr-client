import immutable from 'seamless-immutable'
import { editor, questionModels, tests } from '../actionTypes'

const initialState = immutable({
  /* testModel of the current editor */
  testModelId: null,
  /* questionModel that is edited */
  questionModelId: null,
  /* was the question just created? */
  isQuestionNew: false,
  /* state of the content form */
  isFormSaving: false,
  isFormSaved: false,
  /* was there an update in the current form */
  isFormChanged: false,
  /* are we displaying the form with general settings */
  displayGeneralForm: false,
})

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case editor.INIT_REQ:
      return state
        .set('testModelId', action.payload.testModelId)
    case editor.SET_QUESTION_REQ:
      return state
        .set('questionModelId', action.payload.questionModelId)
        .set('isQuestionNew', false)
        .set('displayGeneralForm', false)
    case editor.SET_NEW_QUESTION_REQ:
      return state
        .set('questionModelId', action.payload.questionModelId)
        .set('isQuestionNew', true)
        .set('displayGeneralForm', false)
    case tests.SAVE_TEST_REQ:
    case questionModels.SAVE_QUESTION_REQ:
      return state
        .set('isFormSaving', true)
    case tests.SAVE_TEST_RES:
    case questionModels.SAVE_QUESTION_RES:
      return state
        .set('isFormSaving', false)
        .set('isFormSaved', true)
    case tests.SAVE_TEST_FAIL:
    case questionModels.SAVE_QUESTION_FAIL:
      return state
        .set('isFormSaving', false)
        .set('isFormSaved', false)
    case editor.FORM_WAS_CHANGED:
      return state
        .set('isFormChanged', action.payload.isFormChanged)
    case editor.CLEAR_QUESTION:
      return state
        .set('questionModelId', null)
        .set('isFormChanged', false)
    case editor.CLEAR_FORM:
      return state
        .set('questionModelId', null)
        .set('displayGeneralForm', false)
        .set('isFormChanged', false)
    case editor.DISPLAY_GENERAL:
      return state
        .set('displayGeneralForm', true)
        .set('questionModelId', null)
    case editor.CLEAR:
      return initialState
    default:
      return state
  }
}
