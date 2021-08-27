import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { withPrivateLayout } from '@components/hof/with-private-layout';
import { UserForm } from '@components/users/user-form';
import { userFormSchema, UserFormValues } from '@components/users/form-schema';
import { USER_CREATED_MESSAGE, NETWORK_ERROR_MESSAGE, USER_ROLE_OPTION } from '@utils/constants';
import { useCreateUser } from '@hooks/request/mutation/useCreateUser';
import { getErrorMessage } from '@utils/axios';
import { UserRoleEnum } from '@typings/common';

const NewUser = () => {
  const formMethods = useForm<UserFormValues>({
    // @ts-ignore
    defaultValues: {
      role: USER_ROLE_OPTION[0],
    },
    resolver: yupResolver(userFormSchema),
  });

  const createUserMutation = useCreateUser();

  const handleCreateUser = (data: UserFormValues) => {
    createUserMutation.mutate({
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role?.value as UserRoleEnum,
    }, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: async () => {
        toast.success(USER_CREATED_MESSAGE);
        formMethods.reset();
      },
    });
  };

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">New User</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleCreateUser)}>
          <UserForm isSubmitting={formMethods.formState.isSubmitting || createUserMutation.isLoading} />
        </form>
      </FormProvider>
    </div>
  );
};

export default withPrivateLayout(NewUser);
