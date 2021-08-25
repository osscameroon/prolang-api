import { ApolloError } from 'apollo-server-express';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLRequestContextDidEncounterErrors } from 'apollo-server-types';

import { Sentry } from '../../shared/core/sentry';

const sentryPlugin: ApolloServerPlugin = {
  requestDidStart: async () => {
    return {
      didEncounterErrors: async (requestContext: GraphQLRequestContextDidEncounterErrors<any>) => {
        if (!requestContext.operation) {
          return;
        }

        for (const err of requestContext.errors) {
          if (err instanceof ApolloError) {
            continue;
          }

          Sentry.withScope((scope) => {
            scope.setTag('kind', requestContext.operation?.operation);
            scope.setExtra('query', requestContext.request.query);
            scope.setExtra('variables', requestContext.request.variables);
            if (err.path) {
              scope.addBreadcrumb({
                category: 'query-path',
                level: Sentry.Severity.Debug,
                message: err.path.join(' > '),
              });
            }
            Sentry.captureException(err);
          });
        }
      },
    };
  },
};

export default sentryPlugin;
