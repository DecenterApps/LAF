import modalTypes from '../components/Modals/modalTypes';
import { TOGGLE_MODAL } from './types';

const checkModalType = (modalType) => {
  if (!Object.prototype.hasOwnProperty.call(modalTypes, modalType)) {
    alert(`Modal type ${modalType} is not defined in modalTypes.js`); // eslint-disable-line
  }
};

const toggleModal = (modalType, modalProps, action) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { action, modalType, modalProps }
  });
};

export const openModal = (modalType, modalProps) => (dispatch) => {
  checkModalType(modalType);
  dispatch(toggleModal(modalType, modalProps, true));
};

export const closeModal = () => (dispatch) => {
  dispatch(toggleModal('', {}, false));
};

