import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import ReportLostForm from '../../Forms/ReportLostForm/ReportLostForm';

const ReportLostModal = ({ closeModal }) => (
  <div>
    <ModalHeader title={'Report lost'} closeModal={closeModal} />

    <ModalBody>
      <ReportLostForm />
    </ModalBody>
  </div>
);

ReportLostModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ReportLostModal;
