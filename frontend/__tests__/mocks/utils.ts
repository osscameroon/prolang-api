export const API_BASE_URL = 'http://localhost:5700';

export const apiUrl = (path: string) => {
  return `${API_BASE_URL}${path}`;
};
export const privateUrl = (path: string) => {
  return `${API_BASE_URL}/private${path}`;
};

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
