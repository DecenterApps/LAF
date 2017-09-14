import {
  ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, ADD_ITEM_RESET, USER_ITEM_ADDED, USER_ITEMS_ADDED
} from '../actions/types';

const INITIAL_STATE = {
  addingItem: false,
  addingItemError: '',
  userItems: []
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

    case USER_ITEM_ADDED: {
      return { ...state, userItems: [payload, ...state.userItems], };
    }

    case USER_ITEMS_ADDED: {
      return { ...state, userItems: payload, };
    }

    default:
      return state;
  }
};
