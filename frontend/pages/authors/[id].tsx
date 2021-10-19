import { useRouter } from 'next/router';

import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Loader } from '@components/common/loader';
import { UpdateAuthor } from '@components/authors/update-author';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveAuthor } from '@hooks/request/query/useRetrieveAuthor';

const UpdateAuthorDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading, isError, isSuccess } = useRetrieveAuthor(query.id as string, { enabled: Boolean(query.id) });

  if (!isLoading && isError) {
    return <ResourceNotFound name="Author" />;
  }

  if (isSuccess && data) {
    return <UpdateAuthor author={data} />;
  }

  return <Loader />;
};

export default withPrivateLayout(UpdateAuthorDataLoader, { title: 'Edit author' });