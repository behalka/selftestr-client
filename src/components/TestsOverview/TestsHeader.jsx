import React, { PropTypes } from 'react'
import { PageHeader, FormGroup, Form, FormControl, Button, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import TestsListItem from './TestsListItem'

const TestsHeader = () =>
  <header className="">
    <Alert bsStyle="warning">
      Tato část aplikace není dokončená!
    </Alert>
    <PageHeader>
      Populární testy
    </PageHeader>
    <div className="tests__search">
      <Form inline>
        <FormGroup>
          <FormControl
            id="tests-search"
            bsSize="lg"
            type="text"
            placeholder="Jméno testu, tag nebo autor"
          />
        </FormGroup>
        <Button bsSize="large" type="submit">
         <FontAwesome name="search" /> Vyhledat
        </Button>
      </Form>
    </div>
  </header>

export default TestsHeader
