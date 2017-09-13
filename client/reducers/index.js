import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import counterReducer from './counterReducer';
import modalsReducer from './modalsReducer';

export default combineReducers({
  routing: routerReducer,
  counter: counterReducer,
  modals: modalsReducer,
  form: formReducer
});
