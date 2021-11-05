import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import PublicLayout from '@components/layout/public/public-layout';
import { BAD_LOGIN_MESSAGE, FORM_ERRORS } from '@utils/constants';
import { FormInput } from '@components/common/form-input';
import { Button } from '@components/common/button';
import { useLogin } from '@hooks/request/mutation/useLogin';
import { useAuth } from '@hooks/useAuth';

const loginSchema = yup.object().shape({
  email: yup.string().required(FORM_ERRORS.fieldRequired).email(FORM_ERRORS.emailInvalid),
  password: yup.string().required(FORM_ERRORS.fieldRequired),
});

type LoginFormValues = yup.InferType<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { saveToken } = useAuth();
  const loginMutation = useLogin();

  const formMethods = useForm<LoginFormValues>({
    defaultValues: {},
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormValues) => {
    loginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onError: () => {
          toast.error(BAD_LOGIN_MESSAGE);
        },
        onSuccess: async (response) => {
          saveToken(response.data.data.token);

          await router.push('/dashboard');
        },
      },
    );
  };

  return (
    <PublicLayout>
      <div className="flex items-center min-h-[calc(100vh-130px)] p-6 bg-gray-50 dark:bg-gray-900">
        <div className="h-full w-1/4 mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div className="w-full">
              <h1 className="mb-8 text-xl font-semibold text-gray-700 dark:text-gray-200">Log into Prolang</h1>
              <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleLogin)}>
                  <FormInput
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="jane.doe@email.com"
                    data-testid="input-email"
                    isRequired
                  />
                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    data-testid="input-password"
                    isRequired
                  />
                  <Button text="Log in" className="w-full justify-center mt-12" loading={loginMutation.isLoading} />
                </form>
              </FormProvider>

              <hr className="my-8" />
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
