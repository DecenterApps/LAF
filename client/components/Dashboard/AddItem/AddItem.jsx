/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openModal, resetAddItemForm } from '../../../actions/modalsActions';
import { ADD_ITEM_MODAL } from '../../Modals/modalTypes';

import ais from './add-item.scss';
import btn from '../../../common-styles/buttons.scss';

const AddItem = ({ $openModal, loadingUserItems }) => (
  <div styleName="ais.add-item-wrapper">
    <button
      styleName="btn.btn-orange btn.btn-lg"
      disabled={loadingUserItems}
      onClick={() => { $openModal(ADD_ITEM_MODAL, {}, resetAddItemForm); }}
    >Add item</button>
  </div>
);

AddItem.propTypes = {
  $openModal: PropTypes.func.isRequired,
  loadingUserItems: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  loadingUserItems: state.items.loadingUserItems
});

const mapDispatchToProps = {
  $openModal: openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
