import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { SelectOption } from '@typings/common';
import { withPrivateLayout } from '@components/hof/with-private-layout';
import { LanguageForm } from '@components/languages/language-form';
import { LanguageFormValues, languageFormSchema } from '@components/languages/form-schema';
import { PageHeader } from '@components/common/page-header';
import { useCreateLanguage } from '@hooks/request/mutation/useCreateLanguage';
import { LANGUAGE_CREATED_MESSAGE, NETWORK_ERROR_MESSAGE, YEAR_CONFIRMED_OPTION } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';
import { useRetrieveYearGroups } from '@hooks/request/query/useRetrieveYearGroups';
import { Loader } from '@components/common/loader';
import { formatYearGroupOption } from '@utils/forms';

const NewLanguage = ({ yearGroupOptions }: { yearGroupOptions: SelectOption[]; }) => {
  const initialValues: Partial<LanguageFormValues> = {
    // @ts-ignore
    yearConfirmed: YEAR_CONFIRMED_OPTION[0],
    // @ts-ignore
    yearGroup: yearGroupOptions[0],
  };

  const formMethods = useForm<LanguageFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(languageFormSchema),
  });

  const createLanguageMutation = useCreateLanguage();

  const handleCreateLanguage = (data: LanguageFormValues) => {
    createLanguageMutation.mutate(
      {
        company: data.company,
        link: data.link,
        name: data.name,
        nameExtra: {
          link: data.extraLink || null,
          name: data.extraName || null,
        },
        yearConfirmed: data.yearConfirmed?.value === 'true',
        yearGroup: data.yearGroup.value,
        years: data.years?.split('-').map((year) => parseInt(year.trim(), 10))
      },
      {
        onError: (error) => {
          toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
        },
        onSuccess: async () => {
          toast.success(LANGUAGE_CREATED_MESSAGE);
          formMethods.reset();
        },
      },
    );
  };

  return (
    <div className="container px-6 mx-auto grid">
      <PageHeader text="Register Language" />
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleCreateLanguage)}>
          <LanguageForm
            isSubmitting={formMethods.formState.isSubmitting || createLanguageMutation.isLoading}
            yearGroupOptions={yearGroupOptions}
          />
        </form>
      </FormProvider>
    </div>
  );
};

const NewLanguageLoader = () => {
  const { data, isLoading } = useRetrieveYearGroups();
  
  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && data) {
    return <NewLanguage yearGroupOptions={formatYearGroupOption(data)} />;
  }
  
  return null;
};

export default withPrivateLayout(NewLanguageLoader);
