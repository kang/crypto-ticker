// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import selectedTickerList from './selectedTickerList';
import tickerList from './tickerList';

const rootReducer = combineReducers({
  tickerList,
  selectedTickerList,
  router
});

export default rootReducer;
