import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Planner, User } from '@typings/common';
import { plannerFormSchema, UpdatePlannerFormValues } from '@components/planner/form-schema';
import { useUpdateProfile } from '@hooks/request/mutation/useUpdateProfile';
import { FormInput } from '@components/common/form-input';
import { Button } from '@components/common/button';
import { NETWORK_ERROR_MESSAGE, PLANNER_UPDATED_MESSAGE } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';
import { PageHeader } from '@components/common/page-header';

type ProfileFormProps = {
  planner: Planner;
};

const ProfileForm = ({ planner }: ProfileFormProps) => {
  const formMethods = useForm<UpdatePlannerFormValues>({
    defaultValues: {
      email: planner.email,
      firstName: planner.firstName,
      lastName: planner.lastName,
      phoneNumber: planner.phoneNumber,
    },
    resolver: yupResolver(plannerFormSchema),
  });

  const updateMutation = useUpdateProfile(planner.id);

  const handleProfileForm = (data: UpdatePlannerFormValues) => {
    updateMutation.mutate(data, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: async (response) => {
        toast.success(PLANNER_UPDATED_MESSAGE);
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
                <FormInput label="First name" name="firstName" type="text" placeholder="Jane" isRequired />
              </div>
              <div className="w-full">
                <FormInput label="Last name" name="lastName" type="text" placeholder="Doe" isRequired />
              </div>
            </div>

            <div className="w-full">
              <div className="w-full">
                <FormInput
                  label="Phone number"
                  name="phoneNumber"
                  type="text"
                  placeholder="06 58 32 38 61"
                  isRequired
                />
              </div>
              <div className="w-full">
                <FormInput
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="jane.doe@email.com"
                  isRequired
                />
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
