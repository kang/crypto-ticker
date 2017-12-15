import Datastore from 'nedb-promise';

global.db = {
  tickerList: new Datastore({ filename: './testdbfile.db', autoload: true })
};

global.db.tickerList.ensureIndex({ fieldName: 'id', unique: true });
