import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import App from '../components/App/App.jsx';

const myRouter = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
      </Switch>
    </HashRouter>
  </Provider>
);

myRouter.propTypes = {
  store: PropTypes.object.isRequired
};

export default myRouter;

