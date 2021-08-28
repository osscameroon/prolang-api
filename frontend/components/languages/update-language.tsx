import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { Author, Language, UpdateLanguageInput, YearGroup } from '@typings/common';
import { languageFormSchema, UpdateLanguageFormValues } from '@components/languages/form-schema';
import { LanguageForm } from '@components/languages/language-form';
import { useUpdateLanguage } from '@hooks/request/mutation/useUpdateLanguage';
import { YEAR_CONFIRMED_OPTION, NETWORK_ERROR_MESSAGE, LANGUAGE_UPDATED_MESSAGE } from '@utils/constants';
import { getErrorMessage } from '@utils/axios';
import { PageHeader } from '@components/common/page-header';
import { formatOptions } from '@utils/forms';

type UpdateLanguageProps = {
  authors: Author[];
  language: Language;
  languages: Language[];
  yearGroups: YearGroup[];
};

const UpdateLanguage = ({ authors, language, languages, yearGroups }: UpdateLanguageProps) => {
  const authorOptions = useMemo(() => formatOptions(authors), [authors]);
  const languageOptions = useMemo(() => formatOptions(languages), [languages]);
  const yearGroupOptions = useMemo(() => formatOptions(yearGroups), [yearGroups]);
  
  const formMethods = useForm<UpdateLanguageFormValues>({
    defaultValues: {
      authors: authorOptions.filter(({ value }) => Boolean(language.authors?.find(({ id }) => value === id))),
      company: language.company || undefined,
      extraLink: language.nameExtra.link || undefined,
      extraName: language.nameExtra.name || undefined,
      link: language.link || undefined,
      longName: language.longName || undefined,
      name: language.name,
      predecessors: languageOptions.filter(({ value }) => Boolean(language.predecessors?.find(({ id }) => value === id))),
      yearConfirmed: YEAR_CONFIRMED_OPTION.find((option) => option.value === `${language.yearConfirmed}`) || YEAR_CONFIRMED_OPTION[0],
      yearGroup: yearGroupOptions.find(option => option.value === language.yearGroup?.id) || yearGroupOptions[0],
      years: language.years.join(' - ')
    },
    resolver: yupResolver(languageFormSchema),
  });

  const updateMutation = useUpdateLanguage(language.id);

  const handleUpdateLanguage = (data: UpdateLanguageFormValues) => {
    const input: UpdateLanguageInput = {
      authors: data.authors.map(({ value }) => value),
      company: data.company,
      link: data.link,
      longName: data.longName,
      name: data.name,
      nameExtra: {
        link: data.extraLink || null,
        name: data.extraName || null,
      },
      predecessors: data.predecessors.map(({ value }) => value),
      yearConfirmed: data.yearConfirmed?.value === 'true',
      yearGroup: data.yearGroup.value,
      years: data.years?.split('-').map((year) => parseInt(year.trim(), 10))
    };

    updateMutation.mutate(input, {
      onError: (error) => {
        toast.error(getErrorMessage(error) || NETWORK_ERROR_MESSAGE);
      },
      onSuccess: () => {
        toast.success(LANGUAGE_UPDATED_MESSAGE);
      },
    });
  };

  return (
    <div className="container px-6 mx-auto grid">
      <PageHeader text="View Language" />
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleUpdateLanguage)}>
          <LanguageForm
            authorOptions={authorOptions}
            isEditMode
            isSubmitting={formMethods.formState.isSubmitting || updateMutation.isLoading}
            languageOptions={languageOptions}
            yearGroupOptions={yearGroupOptions}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export { UpdateLanguage };
