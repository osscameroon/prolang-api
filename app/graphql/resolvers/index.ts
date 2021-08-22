import { hello } from './queries/hello';

const resolvers = {
  Query: {
    hello,
  },
};

export { resolvers };
