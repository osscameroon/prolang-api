import { rest } from 'msw';
import { apiUrl } from './utils';

export const handlers = [
  rest.get(apiUrl('/health'), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Ok'
      })
    );
  })
];