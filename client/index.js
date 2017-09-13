import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './config/Routes';
import store from './config/storeGenerator';
import initWeb3 from './config/initWeb3';
import NoMetamask from './components/NoMetamask/NoMetamask';

const startApp = () => {
  const hasMetamask = initWeb3();

  if (!hasMetamask) {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    ReactDOM.render(<NoMetamask isChrome={isChrome} />, document.getElementById('root'));
  } else {
    ReactDOM.render(
      <div>
        <Routes store={store} />
      </div>, document.getElementById('root'));
  }
};

window.addEventListener('load', startApp);
