/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import is from '../../modules/icon-font.scss';
import mhs from './modals.scss';

const ModalHeader = ({ toggleModal }) => (
  <div styleName="mhs.modal-header">
    <i
      styleName="is.icon is.icon-close mhs.icon-close"
      role="button"
      tabIndex={0}
      onClick={() => { toggleModal('', {}, false); }}
    />
  </div>
);

ModalHeader.propTypes = {
  toggleModal: PropTypes.func.isRequired
};

export default ModalHeader;
