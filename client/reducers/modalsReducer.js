import { TOGGLE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  modalType: '',
  modalProps: {},
  onCloseFunc: null
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;

  switch (action.type) {
    case TOGGLE_MODAL: {
      const close = !payload.action;

      if (close) {
        return INITIAL_STATE;
      }

      return {
        modalType: payload.modalType,
        modalProps: payload.modalProps,
        onCloseFunc: payload.onCloseFunc
      };
    }

    default:
      return state;
  }
};
