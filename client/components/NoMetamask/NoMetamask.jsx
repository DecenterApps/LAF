import React from 'react';
import PropTypes from 'prop-types';

const NoMetamask = ({ isChrome }) => (
  <div>
    {
      isChrome &&
      <div>
        <h2>
          In order to use this app you need to install the
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask</a>
          extension.
        </h2>
      </div>
    }
    {
      !isChrome &&
      <div>
        <h2>
          In order to use this app you must access it
          through the Chrome web browser
          <br />
          and install the
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask</a>
          extension.
        </h2>
      </div>
    }
  </div>
);

NoMetamask.propTypes = {
  isChrome: PropTypes.bool.isRequired
};

export default NoMetamask;
