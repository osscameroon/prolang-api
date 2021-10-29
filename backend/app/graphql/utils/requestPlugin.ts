import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { FieldNode, OperationDefinitionNode, parse } from 'graphql';
import { GraphQLRequestContext } from 'apollo-server-core';
import * as querystring from 'querystring';

import { CreateRequestLogInput, RequestTypeEnum } from '../../shared/types/models';
import requestLogService from '../../domain/services/requestLog.service';
import { getDurationInMilliseconds } from '../../shared/utils/request';
import { AppContext } from '../types/common';

const generateEndpointURL = (operation: string, args: any[][]) => {
  if (args.length === 0) {
    return operation;
  }
  const argsObject = Object.fromEntries(args);
  const queryStringArgs = querystring.stringify(argsObject);

  return `${operation}?${queryStringArgs}`;
};

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

        context.context.xRes.on('finish', async () => {
          if (context.request.operationName !== 'IntrospectionQuery') {
            const obj = parse(query);

            const operationDefinition = obj.definitions[0] as OperationDefinitionNode;
            const selection = operationDefinition.selectionSet.selections[0] as FieldNode;
            // @ts-ignore
            const args = selection.arguments?.map((arg) => [arg.name.value, arg.value.value]) || [];

            const input: CreateRequestLogInput = {
              duration: null,
              endpoint: generateEndpointURL(selection.name.value, args),
              ipAddress: context.context.ip,
              statusCode: 200,
              type: RequestTypeEnum.graphql,
            };

            input.duration = getDurationInMilliseconds(context.context.reqStartTime);

            await requestLogService.create(input);
          }
        });
      },
    };
  },
};

export default requestPlugin;
