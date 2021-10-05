import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { FieldNode, OperationDefinitionNode, parse } from 'graphql';
import { CreateRequestLogInput, RequestTypeEnum } from '../../shared/types/models';
import requestLogService from '../../domain/services/requestLog.service';
import { getDurationInMilliseconds } from '../../shared/utils/request';
import { GraphQLRequestContext } from 'apollo-server-types/src/index';
import { AppContext } from '../types/common';

const requestPlugin: ApolloServerPlugin = {
  // @ts-ignore
  requestDidStart: async () => {
    return {
      didResolveOperation: async (context: GraphQLRequestContext<AppContext>) => {
        const {
          request: { query },
        } = context;

        if (!query) {
          return;
        }

        const obj = parse(query);

        // TODO get the variables
        const operationDefinition = obj.definitions[0] as OperationDefinitionNode;
        const selection = operationDefinition.selectionSet.selections[0] as FieldNode;

        const input: CreateRequestLogInput = {
          duration: null,
          endpoint: selection.name.value,
          ipAddress: context.context.ip,
          statusCode: 200,
          type: RequestTypeEnum.graphql,
        };

        context.context.xRes.on('finish', async () => {
          if (context.request.operationName !== 'IntrospectionQuery') {
            input.duration = getDurationInMilliseconds(context.context.reqStartTime);

            await requestLogService.create(input);
          }
        });
      },
    };
  },
};

export default requestPlugin;
