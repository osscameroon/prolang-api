import { useRouter } from 'next/router';

import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Loader } from '@components/common/loader';
import { UpdateLanguage } from '@components/languages/update-language';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveLanguage } from '@hooks/request/query/useRetrieveLanguage';
import { useLoadLanguageFormData } from '@hooks/useLoadLanguageFormData';

const UpdateLanguageDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading } = useRetrieveLanguage(query.id as string, { enabled: Boolean(query.id) });
  const { authorData, isLoading: isDataLoading, languageData, yearGroupData } = useLoadLanguageFormData();

  const loading = isLoading || isDataLoading;

  if (loading) {
    return <Loader />;
  }

  if (!loading && data && yearGroupData && authorData && languageData) {
    return <UpdateLanguage 
      language={data}
      yearGroups={yearGroupData || []}
      languages={languageData}
      authors={authorData}
    />;
  }

  return <ResourceNotFound name="Language" />;
};

export default withPrivateLayout(UpdateLanguageDataLoader, { title: 'Edit language' });
