import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { UpdateUserInput, User } from '@typings/common';
import { userFormSchema, UpdateUserFormValues } from '@components/users/form-schema';
import { useUpdateUser } from '@hooks/request/mutation/useUpdateUser';
import { FormInput } from '@components/common/form-input';
import { Button } from '@components/common/button';
import { NETWORK_ERROR_MESSAGE, USER_UPDATED_MESSAGE } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';
import { PageHeader } from '@components/common/page-header';

type ProfileFormProps = {
  user: User;
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const formMethods = useForm<UpdateUserFormValues>({
    defaultValues: {
      confirmPassword: '',
      email: user.email,
      name: user.name,
      password: '',
    },
    resolver: yupResolver(userFormSchema),
  });

  const updateMutation = useUpdateUser(user.id);

  const handleProfileForm = (data: UpdateUserFormValues) => {
    const input: UpdateUserInput = {
      email: data.email,
      name: data.name,
      password: data.password,
    };
    
    updateMutation.mutate(input, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: async (response) => {
        toast.success(USER_UPDATED_MESSAGE);
      },
    });
  };

  return (
    <div className="container px-6 mx-auto grid">
      <PageHeader text="User Profile" />
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleProfileForm)}>
          <div className="px-8 py-8 w-1/2 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="w-full">
              <div className="w-full">
                <FormInput label="Name" name="name" type="text" placeholder="Jane" isRequired />
              </div>
              <div className="w-full">
                <FormInput label="Email address" name="email" type="text" placeholder="Doe" isRequired />
              </div>
            </div>

            <div className="w-full flex justify-between">
              <div className="wp-45">
                <FormInput label="Password" type="password" name="password" isRequired />
              </div>
              <div className="wp-45">
                <FormInput label="Confirm password" type="password" name="confirmPassword" isRequired />
              </div>
            </div>

            <div className="w-full mt-8 flex justify-end">
              <Button text="Update" loading={formMethods.formState.isSubmitting || updateMutation.isLoading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export { ProfileForm };
