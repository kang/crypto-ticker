import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TickerList from '../components/TickerList';
import * as TickerListActions from '../actions/tickerList';

function mapStateToProps(state) {
  return {
    tickerList: state.tickerList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TickerListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TickerList);
