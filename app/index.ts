import http from 'http';
import express from 'express';

import { BASE_URL, SERVER_PORT } from './shared/core/config';
import { connectToDatabase } from './shared/core/database';
import { setupRestEndpoints } from './rest/server';
import { logger } from './shared/core/logger';

const app = express();

setupRestEndpoints(app);

const server = http.createServer(app);

server.listen(SERVER_PORT, async () => {
  await connectToDatabase();

  logger.info(`Server started at ${BASE_URL}`);
});

process.on('unhandledRejection', (e: any) => {
  logger.error(e);

  if (e.name === 'MongoError') {
    process.exit(1);
  }
});

export { server };
