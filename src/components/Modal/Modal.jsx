import React, { PropTypes, Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

class ModalBox extends Component {
  static propTypes = {
    body: PropTypes.string.isRequired,
    btnStyle: PropTypes.string,
    isOpened: PropTypes.bool,
    submitHandler: PropTypes.func.isRequired,
    title: PropTypes.string,
  }
  static defaultProps = {
    isOpened: false,
    title: null,
    btnStyle: 'primary',
  }
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const nextOpened = nextProps.isOpened
    if (nextOpened && !this.state.showModal) {
      this.openModal()
    } else if (!nextOpened && this.state.showModal) {
      this.closeModal()
    }
  }
  closeModal() {
    this.setState({
      showModal: false,
    })
  }
  openModal() {
    this.setState({
      showModal: true,
    })
  }
  render() {
    const { submitHandler, title, body, btnStyle } = this.props
    return (
      <Modal show={this.state.showModal} onHide={this.closeModal}>
        {title &&
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        }
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}>Zpět</Button>
          <Button bsStyle={btnStyle} onClick={submitHandler}>Pokračovat</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
export default ModalBox
