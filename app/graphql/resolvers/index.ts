import { hello } from './queries/hello';
import { allYearGroups } from './queries/allYearGroups';
import { oneYearGroup } from './queries/oneYearGroup';

const resolvers = {
  Query: {
    allYearGroups,
    hello,
    oneYearGroup,
  },
};

export { resolvers };
