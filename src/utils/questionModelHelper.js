import immutable from 'seamless-immutable'
import questionTypes from '../constants/questionTypes'
import { v1 } from 'uuid'

export function questionModelToForm(model) {
  const formData = {}
  if (!model.type) {
    // jedna se o general form!
    return Object.assign(formData, model)
  }
  switch (model.type) {
    case questionTypes.text_input.id:
      if (model.answerModels.length > 0) {
        formData.answer = model.answerModels[0].correctSolution
      }
      return Object.assign(formData, model)
    case questionTypes.singlechoice.id:
      const isCorrectIndex = model.answerModels.findIndex(answer => answer.isCorrect)
      formData.isCorrectGroup = isCorrectIndex
      return Object.assign(formData, model)
    case questionTypes.multichoice.id:
      return Object.assign(formData, model)
    default:
      console.log('failed mapping to form')
      throw new Error('question to form mapping failed - invalid question type')
  }
}

export function formToQuestionModel(formData) {
  const questionModel = Object.assign({}, formData)
  switch (formData.type) {
    case questionTypes.text_input.id:
      const correctAnswer = formData.answer
      if (questionModel.answerModels.length > 0) {
        // nemohlo to byt v databazi pokud tohle chybi
        if (!questionModel.answerModels[0].isCorrect) {
          questionModel.answerModels[0].isCorrect = true
        }
        questionModel.answerModels = questionModel.answerModels
          .setIn(['0', 'correctSolution'], correctAnswer)
      } else {
        questionModel.answerModels = questionModel.answerModels.concat({
          isCorrect: true,
          correctSolution: correctAnswer,
        })
      }
      delete questionModel.answer
      return questionModel
    case questionTypes.singlechoice.id:
      questionModel.answerModels = questionModel.answerModels.map((answer, ind) => {
        if (!answer.id) {
          answer.id = v1()
        }
        if (immutable.isImmutable(answer)) {
          answer = answer.set('isCorrect', Boolean(formData.isCorrectGroup === ind))
        } else {
          answer.isCorrect = Boolean(formData.isCorrectGroup === ind)
        }
        return answer
      })
      delete questionModel.isCorrectGroup
      return questionModel
    case questionTypes.multichoice.id:
      questionModel.answerModels = questionModel.answerModels.map(answer => {
        if (!answer.id) {
          answer.id = v1()
        }
        if (typeof answer.isCorrect === 'undefined') {
          answer.isCorrect = false
        }
        return answer
      })
      return questionModel
    default:
      console.log('failed mapping to model')
      throw new Error('questionModel to form mapping failed - invalid form type')
  }
}

export function initQuestionModel(question) {
  question.id = v1()
  question.answerModels = []
  switch (question.type) {
    case questionTypes.text_input.id:
      question.answerModels.push({
        id: v1(),
        isCorrect: true,
      })
      return question
    case questionTypes.multichoice.id:
      for (let i = 0; i < 3; i++) {
        question.answerModels.push({ id: v1() })
      }
      return question
    case questionTypes.singlechoice.id:
      for (let i = 0; i < 3; i++) {
        question.answerModels.push({ id: v1() })
      }
      question.answerModels[0].isCorrect = true
      return question
    default:
      throw new Error('Missing question.type param')
  }
}
