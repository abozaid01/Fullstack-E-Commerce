/* eslint-disable */

import { inspect } from 'util';
import { appendFile } from 'fs';
import colors from 'colors';

enum LogLevel {
  Debug = 0,
  Info = 1,
  Warn = 2,
  Error = 3,
}

interface LogOptions {
  toConsole?: boolean;
  filePath?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private logToFile: boolean;
  private logFilePath: string;

  private readonly logLevelColors = {
    0: 'blue', // Debug
    1: 'green', // Info
    2: 'yellow', // Warn
    3: 'red', // Error
  };

  private constructor() {
    this.logLevel = LogLevel.Debug;
    this.logToFile = false;
    this.logFilePath = '';

    if (process.env.NODE_ENV === 'production') {
      this.logLevel = LogLevel.Info;
      this.logToFile = true;
      this.logFilePath = 'logs/app.log';
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(message: any, level: LogLevel = LogLevel.Info, options: LogOptions = {}): void {
    if (level >= this.logLevel) {
      const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      const logLevelString = LogLevel[level].padEnd(5, ' ');
      const logLevelColor = this.logLevelColors[level];

      let formattedMessage = `[${timestamp}]  [${(colors as any)[logLevelColor](logLevelString)}]  `;

      if (message instanceof Error) formattedMessage += `${message.name}: ${message.message.red}\n${message.stack}`;
      else if (typeof message === 'string') formattedMessage += message;
      else formattedMessage += inspect(message, { showHidden: false, depth: null, colors: true });

      if (options.toConsole === undefined || options.toConsole) {
        console.log(formattedMessage);
      }

      if (this.logToFile) {
        const path = options.filePath ? options.filePath : this.logFilePath;
        const data = formattedMessage.replace(/\u001b\[\d{1,2}m/g, '').replace(/\n/g, '') + '\n';

        appendFile(path, data, function (err) {
          if (err) throw err;
        });
      }
    }
  }

  public static debug(message: any, options?: LogOptions): void {
    this.getInstance().log(message, LogLevel.Debug, options);
  }

  public static info(message: any, options?: LogOptions): void {
    this.getInstance().log(message, LogLevel.Info, options);
  }

  public static warn(message: any, options?: LogOptions): void {
    this.getInstance().log(message, LogLevel.Warn, options);
  }

  public static error(message: any, options?: LogOptions): void {
    this.getInstance().log(message, LogLevel.Error, options);
  }
}

export default Logger;
