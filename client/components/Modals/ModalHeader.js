/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import is from '../../modules/icon-font.scss';
import mhs from './modals.scss';

const ModalHeader = ({ closeModal, title }) => (
  <div styleName="mhs.modal-header">
    { title && <h1>{ title }</h1> }

    <i
      styleName="is.icon is.icon-close mhs.icon-close"
      role="button"
      tabIndex={0}
      onClick={closeModal}
    />
  </div>
);

ModalHeader.defaultProps = {
  title: ''
};

ModalHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string
};

export default ModalHeader;
