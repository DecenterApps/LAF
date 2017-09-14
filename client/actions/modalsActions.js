import modalTypes from '../components/Modals/modalTypes';
import { TOGGLE_MODAL } from './types';

const checkModalType = (modalType) => {
  if (!Object.prototype.hasOwnProperty.call(modalTypes, modalType)) {
    alert(`Modal type ${modalType} is not defined in modalTypes.js`); // eslint-disable-line
  }
};

const toggleModal = (modalType, modalProps, action, onCloseFunc) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { action, modalType, modalProps, onCloseFunc }
  });
};

export const openModal = (modalType, modalProps, onCloseFunc) => (dispatch) => {
  checkModalType(modalType);
  dispatch(toggleModal(modalType, modalProps, true, onCloseFunc));
};

export const closeModal = () => (dispatch, getState) => {
  if (getState().modals.onCloseFunc !== null) {
    dispatch(getState().modals.onCloseFunc());
  }

  dispatch(toggleModal('', {}, false));
};

