import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, render, fireEvent, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';


import Login from '../../components/login/login';

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren<any>) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const server = setupServer(
  rest.get('http://localhost:5700/health', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: 'Ok' }));
  }),
  rest.post('/private/users/auth', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  }),
);

describe('Login page', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should display errors when inputs are empty', async () => {
    const onLoginSuccess = () => {
      return new Promise<void>((resolve) => { resolve(); });
    };

    render(<Login onSuccess={onLoginSuccess} />, { wrapper });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    });

    const inputEmail = screen.getByRole('textbox', { name: /Email address*/i });

    expect(inputEmail).toHaveDisplayValue('');

    const errorLabels = screen.getAllByText('This field is required.', { exact: true });
    expect(errorLabels).toHaveLength(2);
  });
});
