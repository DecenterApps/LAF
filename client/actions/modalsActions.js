import { TOGGLE_MODAL } from './types';

const toggleModal = (modalType, modalProps, action) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { action, modalType, modalProps }
  });
};

export default toggleModal;
