import React, {PropsWithChildren} from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import {act} from "react-dom/test-utils";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import Login from "../../pages/login";

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

describe.only('Login page', () => {
  beforeAll(() => server.listen());

  afterEach(() => {
    cleanup();
    server.resetHandlers();
  });

  afterAll(() => server.close());

  it('should display errors when inputs are empty', async () => {
    render(<Login />, { wrapper });

    // const loginForm = screen.getByTestId('login-form');
    // screen.debug(loginForm);

    await act(async () => {
      fireEvent.click(screen.getByTestId('btn-submit'));
    })

    const inputEmail = screen.getByRole('textbox', { name: /Email address*/i });

    // @ts-ignore
    expect(inputEmail.value).toEqual('');

    const errorLabels = screen.getAllByText('This field is required.', { exact: true });
    expect(errorLabels).toHaveLength(2);
  });

  it('should display errors when email is invalid', async () => {
    const badEmailValue = 'this-is-bad-email';
    const validPasswordValue = 'Passw04D$';

    const  { container } = render(<Login />, { wrapper });

    const inputEmail = screen.getByRole('textbox', { name: /Email address*/i });
    const inputPassword = container.querySelector("input[name='password']");

    await act(async () => {
      fireEvent.input(inputEmail, {
        target: {
          value: badEmailValue
        }
      });
      // @ts-ignore
      fireEvent.input(inputPassword, {
        target: {
          value: validPasswordValue
        }
      });

      fireEvent.click(screen.getByTestId('btn-submit'));
    })

    // @ts-ignore
    expect(inputEmail.value).toEqual(badEmailValue);
    // @ts-ignore
    expect(inputPassword.value).toEqual(validPasswordValue);

    const errorLabels = screen.getAllByText('The email address is invalid.', { exact: true });
    expect(errorLabels).toHaveLength(1);
  });
});