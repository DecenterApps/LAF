/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import BigBlockLoader from '../../Decorative/BigBlockLoader/BigBlockLoader';

import ils from './items-list.scss';
import is from '../../../common-styles/icon-font.scss';

const ItemsList = ({ userItems, loadingUserItems }) => (
  <div styleName={`ils.items-list-wrapper ${loadingUserItems || !userItems.length ? 'ils.center' : ''}`}>

    {/* LOADING ALL ITEMS */}
    {
      loadingUserItems &&
      <div styleName="ils.loading-user-items-wrapper">
        <BigBlockLoader />
        <h2 styleName="ils.loading-text">Loading your items</h2>
      </div>
    }

    {/* NO ITEMS */}
    {
      !loadingUserItems && !userItems.length &&
      <h1>You have not added any items yet</h1>
    }

    {/* ITEMS LIST */}
    {
      !loadingUserItems &&
      userItems.length > 0 &&
      <div styleName="ils.items">
        {
          userItems.map((item) => (
            <div styleName="ils.item" key={shortId.generate()}>
              <div styleName="ils.image-wrapper">
                <img src={item.imageUrl} alt={item.name} />
              </div>
              <div styleName="ils.data-wrapper">
                <h4>{ item.name }</h4>
                <span styleName="ils.info-box">
                  <i styleName="is.icon is.icon-map-marker" />
                  <span>{ item.location }</span>
                </span>
                <span styleName="ils.info-box">
                  <i styleName="is.icon is.icon-envelope-o" />
                  <span>{ item.email }</span>
                </span>
                <span styleName="ils.info-box">
                  <i styleName="is.icon is.icon-phone" />
                  <span>{ item.phone }</span>
                </span>
                {
                  item.lost &&
                  <span>
                    Prize: { item.prize } ETH
                  </span>
                }
              </div>
            </div>
          ))
        }
      </div>
    }
  </div>
);

ItemsList.propTypes = {
  userItems: PropTypes.array.isRequired,
  loadingUserItems: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  userItems: state.items.userItems,
  loadingUserItems: state.items.loadingUserItems
});

export default connect(mapStateToProps)(ItemsList);
