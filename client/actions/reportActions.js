
/* eslint-disable */
import {
  ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR,
  REPORT_LOST, REPORT_LOST_SUCCESS, REPORT_LOST_ERROR,
  REPORT_FOUND, REPORT_FOUND_SUCCESS, REPORT_FOUND_ERROR,
  TOGGLE_MODAL
} from './types';

import {
  _addItem, _lostItem, _foundItem,
} from '../modules/ethereumService';

export const addItem = (itemParam) => async (dispatch, getState) => {
  dispatch({ type: ADD_ITEM });
  let item = {};

  for(const prop in itemParam) {
    item[prop] = web3.toHex(new String(itemParam[prop]));
  }

  try {
    await _addItem(item);
    dispatch({ type: ADD_ITEM_SUCCESS });

    // change later
    if (getState().modals.onCloseFunc !== null) {
      dispatch(getState().modals.onCloseFunc());
    }

    dispatch({
      type: TOGGLE_MODAL,
      payload: { action: false, modalType: '', modalProps: {} }
    });
    // change later
  } catch (err) {
    dispatch({ type: ADD_ITEM_ERROR });
  }
};

export const reportLostItem = (values) => async (dispatch, getState) => {
  dispatch({ type: REPORT_LOST });

  try {
    await _lostItem(getState().modals.modalProps.hash, values.prize);
    dispatch({ type: REPORT_LOST_SUCCESS });

    // change later
    if (getState().modals.onCloseFunc !== null) {
      dispatch(getState().modals.onCloseFunc());
    }

    dispatch({
      type: TOGGLE_MODAL,
      payload: { action: false, modalType: '', modalProps: {} }
    });
    // change later
  } catch (err) {
    dispatch({ type: REPORT_LOST_ERROR });
  }
};

export const reportFoundItem = (values) => async (dispatch) => {
  dispatch({ type: REPORT_FOUND });

  try {
    await _foundItem(web3.toHex(new String(values.hash)));
    dispatch({ type: REPORT_FOUND_SUCCESS });
  } catch (err) {
    dispatch({ type: REPORT_FOUND_ERROR });
  }
};