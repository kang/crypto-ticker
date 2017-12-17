// @flow
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { Link } from 'react-router-dom';
import styles from './TickerList.css';

class TickerList extends Component {
  props: {
    getTickerList: () => void,
    tickerList: Array<{
      name: string,
      id: string,
      symbol: string,
      selected: boolean | void,
      rank: number
    }>,
    toggleTicker: () => void
  };

  state: {
    filter: string
  }

  constructor(props: any) {
    super(props);

    this.state = { filter: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.send('resize', 250);

    this.props.getTickerList();
  }

  handleChange(e: any) {
    this.setState({ filter: e.currentTarget.value });
  }

  render() {
    const { tickerList, toggleTicker } = this.props;
    const { filter } = this.state;

    const filteredList = tickerList.filter(ticker => (
      ticker.id.indexOf(filter) !== -1 || ticker.symbol.indexOf(filter) !== -1
    )).sort((a, b) => (
      +a.rank - +b.rank
    ));

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-2x" />
          </Link>
        </div>
        <div className={styles.container} data-tid="container">
          <h2>Ticker List</h2>
          <div className={styles['grid-container']}>
            <input type="text" className={styles['filter-input']} value={this.state.filter} onChange={this.handleChange} />
            <div className={styles['list-container']}>
              {filteredList.map(ticker => (
                <div tabIndex="0" role="button" key={ticker.id} onClick={() => toggleTicker(ticker.id, !ticker.selected)}>
                  { ticker.selected ?
                    <div><span className={styles.selected}>✓</span>{ticker.name}</div>
                    :
                    ticker.name
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TickerList;
