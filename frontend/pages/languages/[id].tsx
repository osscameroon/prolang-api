import { useRouter } from 'next/router';

import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Loader } from '@components/common/loader';
import { UpdateLanguage } from '@components/languages/update-language';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveLanguage } from '@hooks/request/query/useRetrieveLanguage';
import { useRetrieveYearGroups } from '@hooks/request/query/useRetrieveYearGroups';
import { formatYearGroupOption } from '@utils/forms';

const UpdateLanguageDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading } = useRetrieveLanguage(query.id as string, { enabled: Boolean(query.id) });
  const { data: yearGroupData, isLoading: isYearGroupLoading } = useRetrieveYearGroups({ enabled: Boolean(query.id) });

  const loading = isLoading || isYearGroupLoading;

  if (loading) {
    return <Loader />;
  }

  if (!loading && data && yearGroupData) {
    return <UpdateLanguage language={data} yearGroupOptions={formatYearGroupOption(yearGroupData)} />;
  }

  return <ResourceNotFound name="Language" />;
};

export default withPrivateLayout(UpdateLanguageDataLoader);
