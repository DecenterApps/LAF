import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';

import './items-list.scss';

const ItemsList = ({ userItems }) => (
  <div styleName="items-list-wrapper">
    {
      !userItems.length &&
      <div>You have not added any items yet</div>
    }

    <div styleName="items">
      {
        userItems.length > 0 &&
        userItems.map((item) => (
          <div styleName="item" key={shortId.generate()}>
            <div styleName="image-wrapper">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div styleName="data-wrapper">
              <span>Name: { item.name }</span>
              <span>Location: { item.location }</span>
              <span>Phone: { item.phone }</span>
              <span>Prize: { item.prize }</span>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

ItemsList.propTypes = {
  userItems: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  userItems: state.items.userItems
});

export default connect(mapStateToProps)(ItemsList);
