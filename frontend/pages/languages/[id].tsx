import { useRouter } from 'next/router';

import { Loader } from '@components/common/loader';
import { UpdateLanguage } from '@components/languages/update-language';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveLanguage } from '@hooks/request/query/useRetrieveLanguage';
import { useLoadLanguageFormData } from '@hooks/useLoadLanguageFormData';
import { PrivateLayout } from '@components/layout/private/private-layout';

const UpdateLanguageDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading } = useRetrieveLanguage(query.id as string, { enabled: Boolean(query.id) });
  const { authorData, isLoading: isDataLoading, languageData, yearGroupData } = useLoadLanguageFormData();

  const loading = isLoading || isDataLoading;

  if (loading) {
    return <Loader />;
  }

  if (!loading && data && yearGroupData && authorData && languageData) {
    return (
      <PrivateLayout title="Edit language">
        <UpdateLanguage
          language={data}
          yearGroups={yearGroupData || []}
          languages={languageData}
          authors={authorData}
        />
      </PrivateLayout>);
  }

  return <ResourceNotFound name="Language" />;
};

export default UpdateLanguageDataLoader;
