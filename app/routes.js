/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TickerListPage from './containers/TickerListPage';

export default () => (
  <App>
    <Switch>
      <Route path="/ticker-list" component={TickerListPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
