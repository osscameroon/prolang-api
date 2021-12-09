import { apiUrl } from '../../mocks/utils';

export const mockHealthCheckRequestToReturnBadStatus = () => {
  cy.window().then((window) => {
    const { worker, rest } = window.msw;

    worker.use(
      rest.get(apiUrl('/health'), (_req, res, ctx) => {
        return res(ctx.status(500), ctx.json({}));
      }),
    );
  });
};
