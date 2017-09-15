/* eslint no-unused-vars: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import AccIcon from '../Decorative/AccIcon/AccIcon';

import header from './header.scss';

const Header = () => (
  <header styleName="header.header">
    <Link to="/">
      LAF
    </Link>

    <Link to="/dashboard">
      <AccIcon />
    </Link>
  </header>
);

export default Header;
