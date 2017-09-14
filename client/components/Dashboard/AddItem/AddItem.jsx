/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal } from '../../../actions/modalsActions';
import { resetAddItemForm } from '../../../actions/itemsActions';
import { ADD_ITEM_MODAL } from '../../Modals/modalTypes';

import addItem from './add-item.scss';
import btn from '../../../common-styles/buttons.scss';

const AddItem = ({ $openModal }) => (
  <div styleName="addItem.add-item-wrapper">
    <button
      styleName="btn.btn-orange btn.btn-lg"
      onClick={() => { $openModal(ADD_ITEM_MODAL, {}, resetAddItemForm); }}
    >Add item</button>
  </div>
);

AddItem.propTypes = {
  $openModal: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  $openModal: openModal
};

export default connect(null, mapDispatchToProps)(AddItem);
