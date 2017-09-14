import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import modalsReducer from './modalsReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  routing: routerReducer,
  modals: modalsReducer,
  form: formReducer,
  items: itemsReducer
});
