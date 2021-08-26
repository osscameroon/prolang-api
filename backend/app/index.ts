import http from 'http';
import express from 'express';

import { BASE_URL, SERVER_PORT } from './shared/core/config';
import { connectToDatabase } from './shared/core/database';
import { setupRestEndpoints } from './rest/server';
import { logger } from './shared/core/logger';
import { startGraphqlServer } from './graphql/server';
import { loadUsers } from './shared/core/seed';

export const startServer = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const graphqlServer = await startGraphqlServer(app);

  await connectToDatabase();

  await loadUsers();

  setupRestEndpoints(app);

  httpServer.listen(SERVER_PORT, async () => {
    logger.info(`Rest server ready at ${BASE_URL}/api`);

    logger.info(`GraphQL server ready at ${BASE_URL}${graphqlServer.graphqlPath}`);
  });

  return { graphqlServer, httpServer };
};

(async () => {
  await startServer();
})();

process.on('unhandledRejection', (e: any) => {
  logger.error(e);

  if (e.name === 'MongoError') {
    process.exit(1);
  }
});

process.on('uncaughtException', (e) => {
  logger.error(e);
});
