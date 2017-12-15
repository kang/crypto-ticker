import Datastore from 'nedb';
import { remote } from 'electron';

global.db = {
  tickerList: new Datastore({
    filename: remote.app.getAppPath('appData') + './cryptoTicker.db',
    autoload: true
  })
};

global.db.tickerList.ensureIndex({ fieldName: 'id', unique: true });
