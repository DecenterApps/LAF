import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Home from '../components/Home/Home.jsx';
import ModalRoot from '../components/Modals/ModalRoot';
import Header from '../components/Header/Header';
import Dashboard from '../components/Dashboard/Dashboard';
import { registerItemEventListener } from '../actions/itemsActions';

class myRouter extends Component {
  componentWillMount() {
    this.props.store.dispatch(registerItemEventListener());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <div>
            <Header />
            <ModalRoot />

            <Route path="/dashboard" component={Dashboard} />
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

myRouter.propTypes = {
  store: PropTypes.object.isRequired
};

export default myRouter;

