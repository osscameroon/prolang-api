import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { AuthorForm } from '@components/authors/author-form';
import { authorFormSchema, AuthorFormValues } from '@components/authors/form-schema';
import { AUTHOR_CREATED_MESSAGE, NETWORK_ERROR_MESSAGE } from '@utils/constants';
import { useCreateAuthor } from '@hooks/request/mutation/useCreateAuthor';
import { getErrorMessage } from '@utils/axios';
import { PrivateLayout } from '@components/layout/private/private-layout';

const NewAuthor = () => {
  const formMethods = useForm<AuthorFormValues>({
    resolver: yupResolver(authorFormSchema),
  });

  const createAuthorMutation = useCreateAuthor();

  const handleCreateAuthor = (data: AuthorFormValues) => {
    createAuthorMutation.mutate(data, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: async () => {
        toast.success(AUTHOR_CREATED_MESSAGE);
        formMethods.reset();
      },
    });
  };

  return (
    <PrivateLayout title="New author">
      <div className="container px-6 mx-auto grid">
        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">New Author</h2>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleCreateAuthor)}>
            <AuthorForm isSubmitting={formMethods.formState.isSubmitting || createAuthorMutation.isLoading} />
          </form>
        </FormProvider>
      </div>
    </PrivateLayout>
  );
};

export default NewAuthor;
