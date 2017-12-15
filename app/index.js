import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import './global';

global.db.tickerList.find({}).then(doc => {
  const sortedTickerList = doc.sort((a, b) => (
    +(a.rank) > +(b.rank)
  ));

  const initialState = { tickerList: sortedTickerList };

  const store = configureStore(initialState);

  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
      render(
        <AppContainer>
          <NextRoot store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
      );
    });
  }

  return null;
});
