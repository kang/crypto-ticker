// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import styles from './Home.css';

class Home extends PureComponent {
  props: {
    getTickerList: () => void,
    selectedTickerList: Array<{
      name: string,
      id: string,
      selected: boolean | void,
      symbol: string,
      price_usd: string
    }>
  };

  tickerFetcher: null;

  componentDidMount() {
    this.props.getTickerList();

    this.tickerFetcher = window.setInterval(() => {
      this.props.getTickerList();
    }, 5000);

    const height = (Math.ceil(this.props.selectedTickerList.length / 3) * 100) || 100;
    ipcRenderer.send('resize', height);
  }

  componentWillUpdate(nextProps: any) {
    if (nextProps.selectedTickerList.length !== this.props.selectedTickerList.length) {
      const height = (Math.ceil(nextProps.selectedTickerList.length / 3) * 100) || 100;
      ipcRenderer.send('resize', height);
    }
  }

  componentWillUnmount() {
    clearInterval(this.tickerFetcher);
  }

  render() {
    const selectedTickerList = this.props.selectedTickerList;

    return (
      <div>
        <Link to="/settings" className={styles.settings}>
          <i className="fa fa-cog fa-x" />
        </Link>
        <div className={styles.container} data-tid="container">
          {selectedTickerList.map(ticker => (
            <div key={ticker.id} className={styles.ticker}>
              {`${ticker.symbol}: $${ticker.price_usd}`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
