import { useRouter } from 'next/router';

import { Loader } from '@components/common/loader';
import { UpdateUser } from '@components/users/update-user';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveUser } from '@hooks/request/query/useRetrieveUser';
import { PrivateLayout } from '@components/layout/private/private-layout';

const UpdateUserDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading } = useRetrieveUser(query.id as string, { enabled: Boolean(query.id) });

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && data) {
    return (
      <PrivateLayout title="Edit language">
        <UpdateUser user={data} />
      </PrivateLayout>
    );

  }

  return <ResourceNotFound name="User" />;
};

export default UpdateUserDataLoader;