import { ApolloServer, gql } from 'apollo-server-express';
import { Application } from 'express';

export const startGraphqlServer = async (app: Application) => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  const server = new ApolloServer({ resolvers, typeDefs });

  await server.start();

  server.applyMiddleware({ app });

  return server;
};
