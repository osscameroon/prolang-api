import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5700/api/health', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Ok'
      })
    );
  })
];