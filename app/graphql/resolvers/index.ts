import { dateScalar } from '../scalars/date';
import { hello } from './queries/hello';
import { allYearGroups } from './queries/allYearGroups';
import { oneYearGroup } from './queries/oneYearGroup';
import { allAuthors } from './queries/allAuthors';
import { authors } from './queries/authors';
import { oneAuthor } from './queries/oneAuthor';

const resolvers = {
  Date: dateScalar,
  Query: {
    allAuthors,
    allYearGroups,
    authors,
    hello,
    oneAuthor,
    oneYearGroup,
  },
};

export { resolvers };
