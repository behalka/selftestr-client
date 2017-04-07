import React, { PropTypes } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router'
import FontAwesome from 'react-fontawesome'
import Tag from '../Tag/Tag'

const TestsListItem = ({ test }) =>
  <li className="tests__item">
    <Row>
      <Col xs={12} sm={9}>
        <header>
          <div className="tests__item__name">
            <Link to={`/testy/${test.id}`}>{test.name}</Link>
          </div>
          <div className="tests__item__meta">Autor: {test.author.username},
          vytvořeno 21.12.2016, naposledy upraveno 22.12.2016</div>
          <div className="tests__item__tags">
            {test.tags.map(tag => <Tag key={tag.id} sizes="small" value={tag.text} />)}
          </div>
        </header>
        <div className="tests__item__body">

          {test.description}
        </div>
      </Col>
      <Col xs={12} sm={3} className="tests__item__controls">
        <div className="rating">
          <div className="rating__stars">
            <FontAwesome name="star" size="2x" />
            <FontAwesome name="star" size="2x" />
            <FontAwesome name="star" size="2x" />
            <FontAwesome name="star" size="2x" />
            <FontAwesome name="star-half-full" size="2x" />
          </div>
          <div className="rating__desc">Hodnoceno 123x</div>
        </div>
        <Button bsSize="large" bsStyle="primary">Spustit test</Button>
        <Button bsSize="large">
          <FontAwesome name="heart" /> Přidat test do oblíbených
        </Button>
      </Col>
    </Row>

  </li>

TestsListItem.propTypes = {
  test: PropTypes.object.isRequired,
}

export default TestsListItem
