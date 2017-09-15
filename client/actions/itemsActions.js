/* eslint-disable */
import { findIndex } from 'lodash';
import {
  USER_ITEM_ADDED, USER_ITEMS_ADDED, LOST_ITEM_ADDED, FOUND_ITEM_ADDED
} from './types';
import {
  registerItemEvent, getAccount, getNumberOfItems, getItemWithPosition,
  itemProps, getItemProp, itemLostEvent, itemFoundEvent
} from '../modules/ethereumService';
import { formatLargeNumber } from '../modules/utils';

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

    console.log('ITEM LOST', data.args);

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

export const itemFoundEventListener = () => (dispatch, getState) => {
  itemFoundEvent((err, data) => {
    // ADD WAIT FOR USER ITEMS TO LOAD LISTENER
    // ADD ADD TO USER FOUND ITEMS
    console.log('ITEM FOUND', data.args, getAccount());
    if (err) return;
    if (getAccount() !== data.args.user) return; // change to get from state

    let currentUserItems = [...getState().items.userItems];

    const args = data.args;

    const prize =  formatLargeNumber(parseFloat(web3.fromWei(data.args.prize.toString())));
    const hash = args.hash;
    const index = findIndex(currentUserItems, { hash });
    const founder = args.founder;
    let item = currentUserItems[index];

    item.prize = prize;
    item.founder = founder;

    console.log('ITEM FOUND', item);

    currentUserItems.splice(index, 1, item);

    dispatch({ type: FOUND_ITEM_ADDED, payload: currentUserItems })
  });
};
