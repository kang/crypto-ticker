// @flow
import fetch from 'cross-fetch';
import type { tickerListStateType } from '../reducers/tickerList';

type actionType = {
  +type: string,
  +payload: any
};

export const GET_TICKER_LIST = 'GET_TICKER_LIST';
export const TOGGLE_TICKER = 'TOGGLE_TICKER';

export function getTickerList() {
  return (dispatch: (action: actionType) => void) => (
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=5')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(async (data) => {
        const tickerList = await global.db.tickerList.find({});

        const newTickerList = data.map(ticker => {
          const found = tickerList.find(item => item.id === ticker.id);

          return found ? Object.assign({}, found, ticker) : ticker;
        }).sort((a, b) => (
          +(a.rank) > +(b.rank)
        ));

        await global.db.tickerList.remove({}, { multi: true });

        const retrievedTickerList = await global.db.tickerList.insert(newTickerList);

        return dispatch(gotTickerList(retrievedTickerList));
      })
  );
}

export function gotTickerList(tickerList: tickerListStateType) {
  return {
    type: GET_TICKER_LIST,
    payload: tickerList
  };
}

export function toggleTicker(id: string, toggleOn: boolean) {
  return async (dispatch: (action: actionType) => void) => {
    await global.db.tickerList.update({ id }, { $set: { selected: toggleOn } }, { upsert: true });

    return dispatch({
      type: TOGGLE_TICKER,
      payload: {
        id,
        selected: toggleOn
      }
    });
  };
}
