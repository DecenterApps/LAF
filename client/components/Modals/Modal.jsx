import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './modals.scss';

class Modal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { children: null };
  }

  componentWillMount() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 27) this.props.closeModal();
    });
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.modalOpen) {
      return setTimeout(() => {
        this.setState({ children: null });
        return document.body.classList.toggle('modal-open', false);
      }, 150);
    }

    this.setState({ children: newProps.children });
    return document.body.classList.toggle('modal-open', true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.closeModal);
  }

  render() {
    return (
      <div
        styleName={`modal-backdrop ${this.props.modalOpen ? 'open' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => { this.props.closeModal(); }}
      >
        <div
          role="dialog"
          styleName="modal"
          onClick={(e) => { e.stopPropagation(); }}
        >
          {this.state.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired
};

export default Modal;
