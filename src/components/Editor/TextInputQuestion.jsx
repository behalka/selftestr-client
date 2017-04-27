import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import texts from '../../constants/formHelpers'
import ContentForm from './ContentForm'
import Input from '../forms/Input'
import validate from './TextInputQuestionValidator'

class TextInputQuestion extends ContentForm {
  render() {
    const { handleSubmit, deleteQuestionHandler } = this.props
    return (
      <Form onSubmit={handleSubmit}>
        <h3 className="editor__header">Nastavení otázky</h3>
        <Field
          name="text"
          required
          helper={texts.helpers.questionText}
          label="Znění otázky"
          component={Input}
          componentClass="textarea"/>
        <Field
          name="answer"
          helper={texts.helpers.textAnswer}
          required
          label="Správná odpověď"
          component={Input}
          type="text"/>
        <Field
          name="explanation"
          label="Krátké vysvětlení"
          helper={texts.helpers.explanation}
          component={Input}
          componentClass="textarea"/>
        <Button type="submit" bsStyle="success">
          <FontAwesome name="check" />
          Uložit otázku
        </Button>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="reset-btn">{texts.btns.discard}</Tooltip>}>
          <Button type="reset" bsStyle="default" onClick={this.resetAndScroll}>
            <FontAwesome name="undo" />
            Zahodit změny
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="delete-btn">{texts.btns.delete}</Tooltip>}>
          <Button bsStyle="danger" onClick={deleteQuestionHandler}>
            <FontAwesome name="trash-o" />
            Vymazat otázku
          </Button>
        </OverlayTrigger>
      </Form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'text_input',
  validate,
})(TextInputQuestion)
