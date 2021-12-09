import { apiUrl } from '../../mocks/utils';

export const mockHealthCheckRequestToReturnBadStatus = () => {
  cy.window().then((window) => {
    // @ts-ignore
    const { worker, rest } = window.msw;

    worker.use(
      // @ts-ignore
      rest.get(apiUrl('/health'), (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json({}));
      }),
    );
  });
};
