import { useRouter } from 'next/router';

import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Loader } from '@components/common/loader';
import { UpdateUser } from '@components/users/update-user';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useRetrieveUser } from '@hooks/request/query/useRetrieveUser';

const UpdateUserDataLoader = () => {
  const { query } = useRouter();

  const { data, isLoading } = useRetrieveUser(query.id as string, { enabled: Boolean(query.id) });

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && data) {
    return <UpdateUser user={data} />;
  }

  return <ResourceNotFound name="User" />;
};

export default withPrivateLayout(UpdateUserDataLoader);