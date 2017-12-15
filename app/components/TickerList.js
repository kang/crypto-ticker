// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TickerList.css';

class TickerList extends Component {
  props: {
    getTickerList: () => void,
    tickerList: Array<{
      name: string,
      id: string,
      selected: boolean | void
    }>,
    toggleTicker: () => void
  };

  tickerFetch: null;

  componentDidMount() {
    this.tickerFetcher = window.setInterval(() => {
      this.props.getTickerList();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.tickerFetcher);
  }

  render() {
    const { tickerList, toggleTicker } = this.props;

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={styles.container} data-tid="container">
          <h2>Ticker List</h2>
          <div className={styles['list-container']}>
            {tickerList.map(ticker => (
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
    );
  }
}

export default TickerList;
