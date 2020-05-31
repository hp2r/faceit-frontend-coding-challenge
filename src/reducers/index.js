import { combineReducers } from 'redux';
import tournaments from './tournaments';
import fetchError from './fetchError';

const rootReducer = combineReducers({
  tournaments,
  fetchError
});

export default rootReducer;
