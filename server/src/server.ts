import app from './app';
import dbConnection from './config/db';
import Logger from './utils/Logger';

process.on('uncaughtException', (err: Error) => {
  Logger.warn('UNHANDLED EXECPTION!, shutting down ...');
  Logger.error(err.name);
  Logger.error(err.message);

  process.exit(1);
});

// Connect with db
dbConnection();

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  Logger.info(`Server is running at http://localhost:${port}`);
});

process.on('unhandledRejection', (err: Error) => {
  Logger.warn('UNHANDLED REJECTION!, shutting down ...');
  Logger.error(err.name);
  Logger.error(err.message);
  server.close(() => {
    process.exit(1); // 1 means uncaught execption, 0 means success
  });
});

export default server;
