import path from 'path';
import fs from 'fs';
import { createLogger, format, transports, Logger } from 'winston';
import { isObject } from 'lodash';

import { ENV } from './config';
import { EnhancedLogger } from '../types/common';

const { combine, printf, timestamp }: typeof format = format;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const t: any = require('winston-daily-rotate-file');

const logFileDir: string = path.join(__dirname, '../../../logs');

if (!fs.existsSync(logFileDir)) {
  fs.mkdirSync(logFileDir);
}

const transport = new t({
  dirname: logFileDir,
  filename: 'app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
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
  transports: [transport, new transports.Console()],
  silent: ENV === 'test',
});

const logger: EnhancedLogger = {
  info: (output: unknown) => winstonLogger.info(logMessage(output)),
  error: (output: unknown) => winstonLogger.error(logMessage(output)),
};

export { logger };
