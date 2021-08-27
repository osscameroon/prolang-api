import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { User, UpdateUserInput, UserRoleEnum } from '@typings/common';
import { userFormSchema, UpdateUserFormValues } from '@components/users/form-schema';
import { UserForm } from '@components/users/user-form';
import { useUpdateUser } from '@hooks/request/mutation/useUpdateUser';
import { USER_ROLE_OPTION, NETWORK_ERROR_MESSAGE, USER_UPDATED_MESSAGE } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';
import { PageHeader } from '@components/common/page-header';

type UpdateUserProps = {
  user: User;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
  const formMethods = useForm<UpdateUserFormValues>({
    defaultValues: {
      email: user.email,
      name: user.name,
      role: USER_ROLE_OPTION.find((option) => option.value === user.role) || USER_ROLE_OPTION[0],
    },
    resolver: yupResolver(userFormSchema),
  });

  const updateMutation = useUpdateUser(user.id);

  const handleUpdateUser = (data: UpdateUserFormValues) => {
    const input: UpdateUserInput = {
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role?.value as UserRoleEnum,
    };

    updateMutation.mutate(input, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: () => {
        toast.success(USER_UPDATED_MESSAGE);
      },
    });
  };

  return (
    <div className="container px-6 mx-auto grid">
      <PageHeader text="View User" />
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleUpdateUser)}>
          <UserForm
            isEditMode
            isSubmitting={formMethods.formState.isSubmitting || updateMutation.isLoading}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export { UpdateUser };
