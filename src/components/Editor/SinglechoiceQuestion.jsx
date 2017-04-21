import React from 'react'
import { reduxForm, Field, FieldArray, change } from 'redux-form'
import { Form, Button } from 'react-bootstrap'
import ContentForm from './ContentForm'
import Input from '../forms/Input'

import SinglechoiceAnswer from './SinglechoiceAnswer'
import validate from './ChoiceValidation'

class SinglechoiceQuestion extends ContentForm {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: null,
    }
    this.renderAnswers = this.renderAnswers.bind(this)
    this.updateSelectedAnswer = this.updateSelectedAnswer.bind(this)
  }
  updateSelectedAnswer(index) {
    this.props.dispatch(change('singlechoice', 'isCorrectGroup', index))
  }
  renderAnswers({ fields, meta }) {
    const hasError = meta.error
    return (
      <div className={ hasError ? 'has-error' : ''}>
        <Button onClick={() => fields.push()}>Přidat odpověď</Button>
        <ul className="list list--block list--no-bullets">
          {fields.map((answerModel, index) =>
            <li key={index}>
              <SinglechoiceAnswer
                groupName="isCorrectGroup"
                answerModel={answerModel}
                index={index}
                updateSelectedAnswer={() => this.updateSelectedAnswer(index)} />
              <Button bsStyle="danger" onClick={() => fields.remove(index)}>Odstranit odpověď</Button>
            </li>
          )}
          {hasError && <div className="help-block">{meta.error}</div>}
        </ul>
      </div>
    )
  }
  render() {
    const { reset, handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Nastavení otázky</h3>
        <Field name="text" label="Znění otázky" component={Input} componentClass="textarea"/>
        <FieldArray name="answerModels" component={this.renderAnswers} />
        <Field name="explanation" label="Krátké vysvětlení" component={Input} componentClass="textarea"/>

        <Button type="submit" bsStyle="success">Uložit otázku</Button>
        <Button bsStyle="default" onClick={reset}>Zahodit změny</Button>
        <Button bsStyle="danger" onClick={deleteQuestionHandler}>Vymazat otázku</Button>
      </Form>
    )
  }
}

export default reduxForm({
  validate,
  enableReinitialize: true,
  form: 'singlechoice',
})(SinglechoiceQuestion)
