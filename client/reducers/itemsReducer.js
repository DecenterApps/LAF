import {
  ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, ADD_ITEM_RESET, USER_ITEM_ADDED, USER_ITEMS_ADDED,
  REPORT_LOST, REPORT_LOST_SUCCESS, REPORT_LOST_ERROR, REPORT_LOST_RESET
} from '../actions/types';

const INITIAL_STATE = {
  emptyAddress: '0x0000000000000000000000000000000000000000',
  loadingUserItems: true,
  addingItem: false,
  addingItemError: '',
  userItems: [],
  reportingLostError: '',
  reportingLost: false
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;

  switch (action.type) {
    case ADD_ITEM: {
      return { ...state, addingItem: true };
    }

    case ADD_ITEM_SUCCESS:
    case ADD_ITEM_RESET: {
      return {
        ...state,
        addingItem: false,
        addingItemError: ''
      };
    }

    case ADD_ITEM_ERROR: {
      return {
        ...state,
        addingItem: false,
        addingItemError: 'Error occurred while adding item.'
      };
    }

    case REPORT_LOST: {
      return { ...state, reportingLost: true };
    }

    case REPORT_LOST_SUCCESS:
    case REPORT_LOST_RESET: {
      return {
        ...state,
        reportingLost: false,
        reportingLostError: ''
      };
    }

    case REPORT_LOST_ERROR: {
      return {
        ...state,
        reportingLost: false,
        reportingLostError: 'Error occurred while reporting lost item.'
      };
    }

    case USER_ITEM_ADDED: {
      return { ...state, userItems: [payload, ...state.userItems] };
    }

    case USER_ITEMS_ADDED: {
      return { ...state, userItems: payload, loadingUserItems: false };
    }

    default:
      return state;
  }
};
