import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from './Modal';
import { closeModal } from '../../actions/modalsActions';
import modalTypes from './modalTypes';

const ModalRoot = ({ SpecificModal, modalProps, modalType, $closeModal, modalOpen }) => (
  <Modal modalOpen={modalOpen} closeModal={$closeModal}>
    {
      SpecificModal ?
        <SpecificModal
          closeModal={$closeModal}
          modalType={modalType}
          {...modalProps}
        /> : null
    }
  </Modal>
);

ModalRoot.defaultProps = {
  SpecificModal: null
};

ModalRoot.propTypes = {
  $closeModal: PropTypes.func.isRequired,
  modalProps: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  SpecificModal: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

const mapStateToProps = (state) => ({
  modalProps: state.modals.modalProps,
  modalOpen: state.modals.modalType.length > 0,
  SpecificModal: modalTypes[state.modals.modalType],
  modalType: state.modals.modalType
});

const mapDispatchToProps = {
  $closeModal: closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
