import { useRouter } from 'next/router';

import { Loader } from '@components/common/loader';
import { UpdateAuthor } from '@components/authors/update-author';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveAuthor } from '@hooks/request/query/useRetrieveAuthor';
import { PrivateLayout } from '@components/layout/private/private-layout';

const UpdateAuthorDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading, isError, isSuccess } = useRetrieveAuthor(query.id as string, { enabled: Boolean(query.id) });

  if (!isLoading && isError) {
    return <ResourceNotFound name="Author" />;
  }

  if (isSuccess && data) {
    return (
      <PrivateLayout title="Edit author">
        <UpdateAuthor author={data} />
      </PrivateLayout>
    );
  }

  return <Loader />;
};

export default UpdateAuthorDataLoader;