import { rest } from 'msw';
import { apiSpec } from './fixtures/apidoc';

export const handlers = [
  rest.get('http://localhost:5700/api/health', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Ok'
      })
    );
  }),
  rest.get('http://localhost:5700/spec/prolang.yaml', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.set('Content-Type', 'text/yaml; charset=UTF-8'), ctx.text(apiSpec));
  }),

  rest.get('http://localhost:5700/graphql', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.set('Content-Type', 'text/html; charset=UTF-8'), ctx.text(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf8" />
          <title>Programming languages API</title>
        </head>
        <body>
        </body>
      </html>
    `));
  })
];