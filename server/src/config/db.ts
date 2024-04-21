import mongoose from 'mongoose';
import Logger from '../utils/Logger';

interface DbNameMap {
  [key: string]: string | undefined;
}

const dbNameMap: DbNameMap = {
  development: process.env.DB_NAME_DEV,
  testing: process.env.DB_NAME_TEST,
  production: process.env.DB_NAME_PROD,
};

function dbConnection() {
  const dbName = dbNameMap[process.env.NODE_ENV as string];

  mongoose.connect(process.env.ME_CONFIG_MONGODB_URL as string, { dbName }).then(() => {
    Logger.info('Connected to DB Successfully..');
  });
}

export default dbConnection;
