import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { FieldNode, OperationDefinitionNode, parse } from 'graphql';
import { CreateRequestLogInput, RequestTypeEnum } from '../../shared/types/models';
import requestLogService from '../../domain/services/requestLog.service';

const requestPlugin: ApolloServerPlugin = {
  requestDidStart: async () => {
    return {
      didResolveOperation: async (context) => {
        const {
          request: { query },
        } = context;

        if (!query) {
          return;
        }

        const obj = parse(query);

        const operationDefinition = obj.definitions[0] as OperationDefinitionNode;
        const selection = operationDefinition.selectionSet.selections[0] as FieldNode;

        if (context.request.operationName !== 'IntrospectionQuery') {
          console.log(selection.name.value);
          const { http } = context.request;

          const input: CreateRequestLogInput = {
            endpoint: selection.name.value,
            ipAddress: http?.headers ? http?.headers.get('x-forwarded-for') : null,
            type: RequestTypeEnum.graphql,
          };

          await requestLogService.create(input);
        }
      },
    };
  },
};

export default requestPlugin;
