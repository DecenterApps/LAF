import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExampleModal from './ExampleModal/ExampleModal';
import Modal from './Modal';
import toggleModal from '../../actions/modalsActions';

// Register modal types here
export const EXAMPLE_MODAL = 'example_modal';

const MODAL_COMPONENTS = {
  [EXAMPLE_MODAL]: ExampleModal
};

const ModalRoot = ({ SpecificModal, modalProps, modalType, $toggleModal, modalOpen }) => (
  <Modal modalOpen={modalOpen} toggleModal={$toggleModal}>
    {
      SpecificModal ?
        <SpecificModal
          toggleModal={$toggleModal}
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
  $toggleModal: PropTypes.func.isRequired,
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
  SpecificModal: MODAL_COMPONENTS[state.modals.modalType],
  modalType: state.modals.modalType
});

export default connect(mapStateToProps, { $toggleModal: toggleModal })(ModalRoot);
