import React, {PropsWithChildren} from 'react';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from "react-query";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from "../../pages/login";
import {act} from "react-dom/test-utils";

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren<any>) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
);

const server = setupServer(
    rest.get('http://localhost:5700/api/health', (req, res, ctx) => {
      return res(
          ctx.status(200),
          ctx.json({ message: 'Ok' })
      );
    }),
    rest.post('/private/users/auth', (req, res, ctx) => {
      return res(ctx.json({ greeting: 'hello there' }))
    }),
)

describe('Login page', () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it.only('should display errors when inputs are empty', async () => {
    render(<Login />, { wrapper });

    // const loginForm = screen.getByTestId('login-form');

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-submit'));
    })

    const inputEmail = screen.getByRole('textbox', { name: /Email address*/i });

    expect(inputEmail.textContent).toEqual('');

    const errorLabels = screen.getAllByText('This field is required.', { exact: true });
    expect(errorLabels).toHaveLength(2);
  });
});