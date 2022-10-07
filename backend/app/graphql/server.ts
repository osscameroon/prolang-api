import { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';
import { createComplexityRule, simpleEstimator } from 'graphql-query-complexity';
import depthLimit from 'graphql-depth-limit';
import { Server } from 'http';

import sentryPlugin from './utils/sentryPlugin';
import requestPlugin from './utils/requestPlugin';
import { resolvers } from './resolvers';
import { AppContext } from './types/common';

export const startGraphqlServer = async (app: Application, httpServer: Server) => {
  const schema = loadSchemaSync('**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const depthLimitRule = depthLimit(4, { ignore: [] });
  const complexityRule = createComplexityRule({
    estimators: [simpleEstimator({ defaultComplexity: 1 })],
    maximumComplexity: 100,
  });

  const schemaWithResolvers = addResolversToSchema({
    resolvers,
    schema,
  });

  const server = new ApolloServer({
    cache: 'bounded',
    context: async ({ req, res }): Promise<AppContext> => {
      return {
        ip: req.connection?.remoteAddress ?? req.ip,
        reqStartTime: process.hrtime(),
        xRes: res,
      };
    },
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }), // graceful shutdown
      process.env.NODE_ENV
        ? ApolloServerPluginLandingPageProductionDefault({ embed: true, graphRef: 'prolang-cureent' })
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      sentryPlugin,
      requestPlugin,
    ],
    schema: schemaWithResolvers,
    validationRules: [depthLimitRule, complexityRule],
  });

  await server.start();

  server.applyMiddleware({ app });

  return server;
};
