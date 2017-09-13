/* eslint no-unused-vars: 0 */
import React from 'react';
import { Link } from 'react-router-dom';

import header from './header.scss';
import icons from '../../common-styles/material-icons.scss';

const Header = () => (
  <header styleName="header.header">
    <Link to="/">
      LAF
    </Link>

    <Link to="/dashboard">
      <i styleName="icons.material-icons">account_box</i>
    </Link>
  </header>
);

export default Header;
