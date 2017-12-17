// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import { getTickerList } from '../actions/tickerList';

function mapStateToProps(state) {
  return {
    selectedTickerList: state.selectedTickerList
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTickerList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
