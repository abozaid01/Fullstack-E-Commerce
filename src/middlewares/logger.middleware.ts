import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/Logger';

const httpLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, originalUrl, ip, headers } = req;
  const userAgent = headers['user-agent'];
  const start = new Date();

  res.on('finish', () => {
    const end = new Date();
    const responseTime = `${end.getTime() - start.getTime()}ms`.padEnd(5);
    const requests = {
      method: method,
      url: originalUrl.padEnd(50),
      status: res.statusCode,
      responseTime,
      IP: ip?.padEnd(34),
      userAgent,
    };

    if (res.statusCode >= 200 && res.statusCode < 400) Logger.info(requests, { toConsole: false, filePath: 'logs/requests.log' });
    else if (res.statusCode >= 400 && res.statusCode < 500) Logger.warn(requests, { toConsole: false, filePath: 'logs/requests.log' });
    else Logger.error(requests, { toConsole: false, filePath: 'logs/requests.log' });
  });

  next();
};

export default httpLoggerMiddleware;
