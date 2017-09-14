/* eslint-disable */
import contract from './config.json';

const networkIds = {
  mainnet: '1',
  morden: '2',
  ropsten: '3',
  kovan: '42',
};

let lafContract;

window.onload = () => {
  lafContract = web3.eth.contract(contract.abi).at(contract.contractAddress);
};

export const getAccount = () => {
  if (!web3.eth.accounts || !web3.eth.accounts.length) { return false; }

  return web3.eth.accounts[0];
};

export const getBlockNumber = () =>
  new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((error, latestBlock) => {
      if (error) {
        return reject(error);
      }

      return resolve(latestBlock);
    });
  });

/* Contract functions (prefixed by "_") */

export const _addItem = (item) =>
  new Promise((resolve, reject) => {
    lafContract.registerItem(
      item.hash, item.name, item.email, item.phoneNumber, item.location, item.imageUrl,
      (error, result) => {
        if (error) {
          return reject({
            message: error,
          });
        }

        return resolve(result);
      });
  });

/* Events */

export const registerItemEvent = async (callback) => {
  let latestBlock = 0;

  try {
    latestBlock = await getBlockNumber();
  } catch (err) {
    return callback(err, null);
  }

  lafContract.ItemRegistered({}, { fromBlock: latestBlock, toBlock: 'latest' })
    .watch((error, event) => {
      if (error) {
        return callback(error, null);
      }

      return callback(null, event);
    });

  return true;
};
