/* eslint-disable */
import { ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, ADD_ITEM_RESET } from './types';
import { _addItem } from '../modules/ethereumService';
import { registerItemEvent, getAccount } from '../modules/ethereumService';
import { closeModal } from './modalsActions';

export const resetAddItemForm = () => (dispatch) => {
  dispatch({ type: ADD_ITEM_RESET })
};

export const addItem = (itemParam) => async (dispatch) => {
  dispatch({ type: ADD_ITEM });
  let item = {};

  for(const prop in itemParam) {
    item[prop] = web3.toHex(itemParam[prop]);
  }

  try {
    await _addItem(item);
    dispatch({ type: ADD_ITEM_SUCCESS });
    dispatch(closeModal());
  } catch (err) {
    dispatch({ type: ADD_ITEM_ERROR });
  }
};

export const registerItemEventListener = () => (dispatch) => {
  registerItemEvent((err, data) => {
    if (err) return;
    if (getAccount() !== data.args.user) return; // change to get from state

    const args = data.args;

    let item = {};

    for(const prop in args) {
      if (prop === 'user') continue;
      args[prop] = web3.toUtf8(args[prop]);
    }

    console.log('USER REGISTERED ITEM', data, args, item);
  });
};
