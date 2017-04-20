import React from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { Form, Button } from 'react-bootstrap'
import ContentForm from './ContentForm'
import Input from '../forms/Input'
import Checkbox from '../forms/Checkbox'
// todo: validace
import validate from './TextInputQuestionValidator'

class MultichoiceQuestion extends ContentForm {
  renderAnswers({ fields, meta }) {
    return (
      <ul>
        <li><Button onClick={() => fields.push()}>Přidat odpověď</Button></li>
        {fields.map((answerModel, index) =>
          <li key={index}>
            <Field name={`${answerModel}.text`} label="Znění odpovědi" component={Input} type="text" />
            <Field name={`${answerModel}.isCorrect`} label="Je odpověď správně" component={Checkbox} type="checkbox" />
            <Button bsStyle="danger" onClick={() => fields.remove(index)}>Odstranit odpověď</Button>
          </li>
        )}
        {
          // console.log(meta)
        }
      </ul>
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
  enableReinitialize: true,
  form: 'multichoice',
})(MultichoiceQuestion)
