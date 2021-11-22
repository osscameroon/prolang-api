import React, { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Login from '../../pages/login';

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

describe.only('Login page', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should display errors when inputs are empty', async () => {
    render(<Login />, { wrapper });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    });

    const inputEmail = screen.getByRole('textbox', { name: /Email address*/i });

    // @ts-ignore
    expect(inputEmail.value).toEqual('');

    const errorLabels = screen.getAllByText('This field is required.', { exact: true });
    expect(errorLabels).toHaveLength(2);
  });

  it('should display errors when email is invalid', async () => {
    const badEmailValue = 'this-is-bad-email';
    const validPasswordValue = 'Passw04D$';

    render(<Login />, { wrapper });

    const inputEmail = screen.getByRole('textbox', { name: /Email address*/i });
    const inputPassword = screen.getByLabelText(/password*/i);

    await act(async () => {
      userEvent.type(inputEmail, badEmailValue);
      userEvent.type(inputPassword, validPasswordValue);

      fireEvent.click(screen.getByRole('button', { name: /Log in/i }));
    });

    // @ts-ignore
    expect(inputEmail.value).toEqual(badEmailValue);
    // @ts-ignore
    expect(inputPassword.value).toEqual(validPasswordValue);

    const errorLabels = screen.getAllByText('The email address is invalid.', { exact: true });
    expect(errorLabels).toHaveLength(1);
  });
});
