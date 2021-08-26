import path from 'path';
import fs from 'fs';
import { createLogger, format, transports, Logger } from 'winston';
import { isObject } from 'lodash';

import { ENV, SENTRY_ENABLED } from './config';
import { EnhancedLogger } from '../types/common';
import { logErrorToSentry } from './sentry';

const { combine, printf, timestamp }: typeof format = format;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const t: any = require('winston-daily-rotate-file');

const logFileDir: string = path.join(__dirname, '../../../logs');

if (!fs.existsSync(logFileDir)) {
  fs.mkdirSync(logFileDir);
}

const transport = new t({
  datePattern: 'YYYY-MM-DD',
  dirname: logFileDir,
  filename: 'app-%DATE%.log',
  maxFiles: '14d',
  maxSize: '20m',
  zippedArchive: true,
});

const logMessage = (message: any): string => {
  // @ts-ignore
  return isObject(message) ? (message.stack ? message.stack : JSON.stringify(message, null, 2)) : message.toString();
};

const myFormat = printf((info) => {
  const { level, message, timestamp } = info;

  return `${timestamp} ${level}: ${logMessage(message)}`;
});

const winstonLogger: Logger = createLogger({
  format: combine(timestamp(), myFormat),
  silent: ENV === 'test',
  transports: [transport, new transports.Console()],
});

const logger: EnhancedLogger = {
  error: (error: unknown, toSentry = true) => {
    winstonLogger.error(logMessage(error));
    if (toSentry && SENTRY_ENABLED) {
      logErrorToSentry(error);
    }
  },
  info: (output: unknown) => winstonLogger.info(logMessage(output)),
};

export { logger };
