import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

import Tag from '../Tag/Tag'

const PopularTags = ({ tags }) =>
  <div className="popular-tags">
    <Row>
      <Col xs={12}>
        <ul className="popular-tags__list">
          {tags.map(tag => <li key={tag.id} className="popular-tags__list-item">
          <Tag value={tag.text} sizes="large" /></li>)}
        </ul>
      </Col>
    </Row>
  </div>
PopularTags.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default PopularTags
