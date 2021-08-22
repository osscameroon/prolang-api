import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { Application } from 'express';
import { resolvers } from './resolvers';

export const startGraphqlServer = async (app: Application) => {
  const schema = loadSchemaSync('**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
  });

  const schemaWithResolvers = addResolversToSchema({
    resolvers,
    schema,
  });

  const server = new ApolloServer({
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    schema: schemaWithResolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  return server;
};
