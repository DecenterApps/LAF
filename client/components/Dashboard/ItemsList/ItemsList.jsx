/* eslint no-unused-vars: 0 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortId from 'shortid';
import BigBlockLoader from '../../Decorative/BigBlockLoader/BigBlockLoader';
import { openModal, resetReportLostForm } from '../../../actions/modalsActions';
import { REPORT_LOST_MODAL } from '../../Modals/modalTypes';
import { confirmFoundItem } from '../../../actions/reportActions';
import CircleLoader from '../../Decorative/CircleLoader/CircleLoader';

import ils from './items-list.scss';
import is from '../../../common-styles/icon-font.scss';
import btn from '../../../common-styles/buttons.scss';

const ItemsList = ({
  userItems, loadingUserItems, emptyAddress, $openModal, $confirmFoundItem, confirmingFoundError,
  confirmingFound, confirmingFoundErrorHash
}) => (
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
              {
                ((item.founder !== emptyAddress) ||
                (item.prize !== '0')) &&
                <div styleName="ils.status-ribbon">
                  {
                    item.prize !== '0' && (item.founder === emptyAddress) &&
                    <span styleName="ils.lost">LOST</span>
                  }
                  {
                    item.prize !== '0' && (item.founder !== emptyAddress) &&
                    <span styleName="ils.claimed">CLAIMED FOUND</span>
                  }
                  {
                    item.prize === '0' && (item.founder !== emptyAddress) &&
                    <span>FOUND</span>
                  }
                </div>
              }

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
                  item.prize !== '0' &&
                  <span>Prize: { item.prize } ETH</span>
                }
              </div>

              {
                emptyAddress === item.founder &&
                item.prize === '0' &&
                <button
                  styleName="btn.btn ils.report-lost-button"
                  onClick={() => {
                    $openModal(REPORT_LOST_MODAL, { hash: item.hash }, resetReportLostForm);
                  }}
                >
                  Report lost
                </button>
              }

              {
                confirmingFoundError &&
                (confirmingFoundErrorHash === item.hash) &&
                <div styleName="ils.finding-item-error">{ confirmingFoundError }</div>
              }

              {
                item.prize !== '0' && (item.founder !== emptyAddress) &&
                <button
                  disabled={confirmingFound}
                  styleName="btn.btn ils.report-lost-button"
                  onClick={() => { $confirmFoundItem(item.hash); }}
                >
                  { confirmingFound &&
                    <span styleName="ils.loader-wrapper"><CircleLoader /></span>
                  }
                  <span>{ confirmingFound ? 'Paying out' : 'Payout' } prize</span>
                </button>
              }
            </div>
          ))
        }
      </div>
    }
  </div>
);

ItemsList.propTypes = {
  userItems: PropTypes.array.isRequired,
  loadingUserItems: PropTypes.bool.isRequired,
  emptyAddress: PropTypes.string.isRequired,
  $openModal: PropTypes.func.isRequired,
  $confirmFoundItem: PropTypes.func.isRequired,
  confirmingFoundError: PropTypes.string.isRequired,
  confirmingFoundErrorHash: PropTypes.string.isRequired,
  confirmingFound: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  userItems: state.items.userItems,
  loadingUserItems: state.items.loadingUserItems,
  emptyAddress: state.items.emptyAddress,
  confirmingFoundError: state.items.confirmingFoundError,
  confirmingFound: state.items.confirmingFound,
  confirmingFoundErrorHash: state.items.confirmingFoundErrorHash
});

const mapDispatchToProps = {
  $openModal: openModal,
  $confirmFoundItem: confirmFoundItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
