// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tickerList from './tickerList';

const rootReducer = combineReducers({
  tickerList,
  router,
});

export default rootReducer;
