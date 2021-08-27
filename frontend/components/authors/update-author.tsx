import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Author } from '@typings/common';
import { authorFormSchema, UpdateAuthorFormValues } from '@components/authors/form-schema';
import { AuthorForm } from '@components/authors/author-form';
import { useUpdateAuthor } from '@hooks/request/mutation/useUpdateAuthor';
import { AUTHOR_UPDATED_MESSAGE, NETWORK_ERROR_MESSAGE } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';

type UpdateAuthorProps = {
  author: Author;
};

const UpdateAuthor = ({ author }: UpdateAuthorProps) => {
  const formMethods = useForm<UpdateAuthorFormValues>({
    defaultValues: {
      birthDate: author.birthDate,
      country: author.country,
      link: author.link,
      name: author.name,
      picture: author.picture,
    },
    resolver: yupResolver(authorFormSchema),
  });

  const updateMutation = useUpdateAuthor(author.id);

  const handleUpdateAuthor = (data: UpdateAuthorFormValues) => {
    updateMutation.mutate(data, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: async () => {
        toast.success(AUTHOR_UPDATED_MESSAGE);
      },
    });
  };

  return (
    <div className="container px-6 mx-auto grid">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">View Author</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleUpdateAuthor)}>
          <AuthorForm isEditMode isSubmitting={formMethods.formState.isSubmitting || updateMutation.isLoading} />
        </form>
      </FormProvider>
    </div>
  );
};

export { UpdateAuthor };
