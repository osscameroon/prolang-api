import { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Author, Language, YearGroup } from '@typings/common';
import { withPrivateLayout } from '@components/hof/with-private-layout';
import { LanguageForm } from '@components/languages/language-form';
import { LanguageFormValues, languageFormSchema } from '@components/languages/form-schema';
import { PageHeader } from '@components/common/page-header';
import { useCreateLanguage } from '@hooks/request/mutation/useCreateLanguage';
import { LANGUAGE_CREATED_MESSAGE, NETWORK_ERROR_MESSAGE, YEAR_CONFIRMED_OPTION } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';
import { Loader } from '@components/common/loader';
import { formatOptions } from '@utils/forms';
import { useLoadLanguageFormData } from '@hooks/useLoadLanguageFormData';

type NewLanguageProps = {
  authors: Author[];
  languages: Language[];
  yearGroups: YearGroup[];
};

const NewLanguage = ({ authors, languages, yearGroups }: NewLanguageProps) => {
  const authorOptions = useMemo(() => formatOptions(authors), [authors]);
  const languageOptions = useMemo(() => formatOptions(languages), [languages]);
  const yearGroupOptions = useMemo(() => formatOptions(yearGroups), [yearGroups]);
  
  const initialValues: Partial<any> = {
    authors: [],
    predecessors: [],
    yearConfirmed: YEAR_CONFIRMED_OPTION[0],
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
        authors: data.authors.map(({ value }) => value),
        company: data.company,
        link: data.link,
        name: data.name,
        nameExtra: {
          link: data.extraLink || null,
          name: data.extraName || null,
        },
        predecessors: data.predecessors.map(({ value }) => value),
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
            authorOptions={authorOptions}
            languageOptions={languageOptions}
            isSubmitting={formMethods.formState.isSubmitting || createLanguageMutation.isLoading}
            yearGroupOptions={yearGroupOptions}
          />
        </form>
      </FormProvider>
    </div>
  );
};

const NewLanguageLoader = () => {
  const { authorData, isLoading, languageData, yearGroupData } = useLoadLanguageFormData();

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && (authorData && languageData && yearGroupData)) {
    return <NewLanguage yearGroups={yearGroupData} authors={authorData} languages={languageData} />;
  }
  
  return null;
};

export default withPrivateLayout(NewLanguageLoader);
