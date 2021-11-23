import { rest } from 'msw';
import { apiSpec } from './fixtures/apidoc';
import { currentUserData, dashboardStatData, loginUserData } from './fixtures/api-response';

export const handlers = [
  rest.get('http://localhost:5700/health', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Ok',
      }),
    );
  }),

  rest.get('http://localhost:5700/spec/prolang.yaml', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.set('Content-Type', 'text/yaml; charset=UTF-8'), ctx.text(apiSpec));
  }),

  rest.get('http://localhost:5700/graphql', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('Content-Type', 'text/html; charset=UTF-8'),
      ctx.text(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf8" />
            <title>Programming languages API</title>
          </head>
          <body>
          </body>
        </html>
      `),
    );
  }),

  rest.post('http://localhost:5700/private/users/auth', (req, res, ctx) => {
    // @ts-ignore
    const { email } = req.body;

    if (email === 'user@email.com') {
      return res(ctx.status(400), ctx.json({ message: 'Login failed: Invalid credentials' }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        data: loginUserData,
      }),
    );
  }),

  rest.get('http://localhost:5700/private/users/me', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: currentUserData,
      }),
    );
  }),

  rest.get('http://localhost:5700/private/stat/summary', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: dashboardStatData,
      }),
    );
  }),
];
