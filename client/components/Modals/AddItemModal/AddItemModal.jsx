import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import AddItemForm from '../../Forms/AddItemForm/AddItemForm';

const AddItemModal = ({ closeModal }) => (
  <div>
    <ModalHeader title={'Add Item'} closeModal={closeModal} />

    <ModalBody>
      <AddItemForm />
    </ModalBody>
  </div>
);

AddItemModal.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default AddItemModal;
