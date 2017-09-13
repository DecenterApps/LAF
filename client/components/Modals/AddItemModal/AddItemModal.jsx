import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';

const ExampleModal = ({ closeModal }) => (
  <div>
    <ModalHeader title={'Add Item'} closeModal={closeModal} />
    <ModalBody>
      CONTENT
    </ModalBody>
  </div>
);

ExampleModal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ExampleModal;
