import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from 'react-tooltip-lite';
import { increment } from '../../actions/counterActions';
import ModalRoot, { EXAMPLE_MODAL } from '../Modals/ModalRoot';
import toggleModal from '../../actions/modalsActions';
import ExampleForm from '../Forms/ExampleForm/ExampleForm';

import './app.scss';

const App = ({ $increment, counter, $toggleModal }) => (
  <div styleName="app">
    <ModalRoot />

    <div styleName="example-section">
      <h3>Redux action example</h3>

      <button onClick={$increment}>Increment</button>
      <span>Counter: {counter}</span>
    </div>

    <div styleName="example-section">
      <h3>Modal example</h3>

      <button onClick={() => { $toggleModal(EXAMPLE_MODAL, {}, true); }}>Open modal</button>
    </div>

    <div styleName="example-section">
      <h3>Tooltip example</h3>

      <Tooltip
        tagName="span"
        useDefaultStyles
        content="Example tooltip text"
      >
        Hover over me
      </Tooltip>
    </div>

    <div styleName="example-section">
      <h3>Form example</h3>

      <ExampleForm />
    </div>
  </div>
);

App.propTypes = {
  $increment: PropTypes.func.isRequired,
  $toggleModal: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  counter: state.counter.counter
});

const mapDispatchToProps = {
  $increment: increment,
  $toggleModal: toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
