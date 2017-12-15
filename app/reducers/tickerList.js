// @flow
import { GET_TICKER_LIST, TOGGLE_TICKER } from '../actions/tickerList';

export type tickerListStateType = Array<{name: string, id: string, selected: any}>;

type actionType = {
  +type: string,
  payload: any
};

const defaultState = [];

export default function tickerList(state: tickerListStateType = defaultState, action: actionType) {
  switch (action.type) {
    case GET_TICKER_LIST:
      return action.payload;
    case TOGGLE_TICKER:
      return state.map((item: { id: string, selected: any }) => {
        const newItem = Object.assign({}, item);

        if (newItem.id === action.payload.id) {
          newItem.selected = action.payload.selected;
        }
        return newItem;
      });
    default:
      return state;
  }
}
