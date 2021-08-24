import { GraphQLScalarType, Kind } from 'graphql';
import { ApolloError } from 'apollo-server-express';
import { DATE_REGEX, INVALID_DATE_TYPE_CODE, INVALID_DATE_TYPE_MESSAGE } from '../../shared/utils/constants';

export const dateScalar = new GraphQLScalarType({
  description: 'Date custom scalar type',
  name: 'Date',
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (!DATE_REGEX.test(ast.value)) {
        throw new ApolloError(INVALID_DATE_TYPE_MESSAGE, INVALID_DATE_TYPE_CODE);
      }

      return `${ast.value}T01:00:00`;
    }

    throw new ApolloError(INVALID_DATE_TYPE_MESSAGE, INVALID_DATE_TYPE_CODE);
  },
  parseValue(value: string) {
    return new Date(value); // Convert incoming integer to Date
  },
  serialize(value: Date) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
});
