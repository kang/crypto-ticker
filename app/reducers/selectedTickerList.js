// @flow
import { GET_TICKER_LIST, TOGGLE_TICKER } from '../actions/tickerList';

export type selectedTickerListStateType = Array<{name: string, id: string, selected: any}>;

type actionType = {
  +type: string,
  payload: any
};

const defaultState = [];

export default function selectedTickerList(state: selectedTickerListStateType = defaultState, action: actionType) {
  switch (action.type) {
    case GET_TICKER_LIST:
      return action.payload.filter(ticker => ticker.selected);
    case TOGGLE_TICKER:
      // same as in the tickerList except filtered for selected tickers
      return state.map((item: { id: string, selected: any }) => {
        const newItem = Object.assign({}, item);

        if (newItem.id === action.payload.id) {
          newItem.selected = action.payload.selected;
        }
        return newItem;
      }).filter(ticker => ticker.selected);
    default:
      return state;
  }
}
