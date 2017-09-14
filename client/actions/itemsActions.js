/* eslint-disable */
import { findIndex } from 'lodash';
import {
  ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_ERROR, ADD_ITEM_RESET, USER_ITEM_ADDED, USER_ITEMS_ADDED,
  REPORT_LOST, REPORT_LOST_SUCCESS, REPORT_LOST_ERROR, REPORT_LOST_RESET, LOST_ITEM_ADDED
} from './types';
import {
  _addItem, registerItemEvent, getAccount, getNumberOfItems, getItemWithPosition,
  itemProps, getItemProp, _lostItem, itemLostEvent
} from '../modules/ethereumService';
import { formatLargeNumber } from '../modules/utils';
import { closeModal } from './modalsActions';

export const resetAddItemForm = () => (dispatch) => {
  dispatch({ type: ADD_ITEM_RESET })
};

export const resetReportLostForm = () => (dispatch) => {
  dispatch({ type: REPORT_LOST_RESET })
};

export const addItem = (itemParam) => async (dispatch) => {
  dispatch({ type: ADD_ITEM });
  let item = {};

  for(const prop in itemParam) {
    item[prop] = web3.toHex(new String(itemParam[prop]));
  }

  try {
    await _addItem(item);
    dispatch({ type: ADD_ITEM_SUCCESS });
    dispatch(closeModal());
  } catch (err) {
    dispatch({ type: ADD_ITEM_ERROR });
  }
};

export const reportLostItem = (values) => async (dispatch, getState) => {
  dispatch({ type: REPORT_LOST });

  try {
    await _lostItem(getState().modals.modalProps.hash, values.prize);
    dispatch({ type: REPORT_LOST_SUCCESS });
    dispatch(closeModal());
  } catch (err) {
    dispatch({ type: REPORT_LOST_ERROR });
  }
};

export const registerItemEventListener = () => (dispatch, getState) => {
  registerItemEvent((err, data) => {
    if (err) return;
    if (getAccount() !== data.args.user) return; // change to get from state

    const args = data.args;

    let item = {};

    for(const prop in args) {
      if (prop === 'user') continue;

      if (prop === 'hash') {
        item[prop] = args[prop];
        continue;
      }

      let value = web3.toUtf8(new String(args[prop]));
      value = value.substring(1, value.length - 1);
      item[prop] = value;
    }

    // new item can't be lost
    item.prize = "0";
    item.founder = getState().items.emptyAddress;

    console.log('USER REGISTERED ITEM', args, item);
    dispatch({ type: USER_ITEM_ADDED, payload: item });
  });
};

export const itemLostEventListener = () => (dispatch, getState) => {
  itemLostEvent((err, data) => {
    if (err) return;
    if (getAccount() !== data.args.user) return; // change to get from state

    let currentUserItems = [...getState().items.userItems];

    const args = data.args;

    const prize =  formatLargeNumber(parseFloat(web3.fromWei(data.args['prize'].toString())));
    const hash = args['hash'];
    const index = findIndex(currentUserItems, { hash });
    let item = currentUserItems[index];

    item.prize = prize;

    currentUserItems.splice(index, 1, item);

    dispatch({ type: LOST_ITEM_ADDED, payload: currentUserItems })
  });
};

export const getAllUserItems = () => async (dispatch) => {
  try {
    const numOfUserItems = parseInt(await getNumberOfItems());

    const items = [];

    for (let i = 0; i < numOfUserItems; i++) {
      const itemHash = await getItemWithPosition(i);
      const item = {};

      item.hash = itemHash;

      for (let j = 0; j < itemProps.length; j++) {
        let itemPropName = itemProps[j];
        let itemPropVal = await getItemProp(itemProps[j], itemHash);
        if (itemPropName === 'Prize') {
          itemPropVal = formatLargeNumber(parseFloat(web3.fromWei(itemPropVal.toString())));
        } else if (itemPropName === 'Founder') {
          itemPropVal = itemPropVal.toString();
        } else {
          itemPropVal = web3.toUtf8(new String (itemPropVal));
          itemPropVal = itemPropVal.substring(1, itemPropVal.length - 1);
        }

        itemPropName = itemPropName.substr(0, 1).toLowerCase() + itemPropName.substr(1);
        item[itemPropName] = itemPropVal;
      }

      items.push(item);
    }

    console.log('ITEMS', items);

    dispatch({ type: USER_ITEMS_ADDED, payload: items.reverse() });
  } catch (err) {
    // handle this
    return;
  }
};
