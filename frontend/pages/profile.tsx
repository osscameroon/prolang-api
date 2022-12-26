import { Loader } from '@components/common/loader';
import { ProfileForm } from '@components/profile/profile-form';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { PrivateLayout } from '@components/layout/private/private-layout';
import { useAuth } from '@hooks/useAuth';

const ProfileDataLoader = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!loading && user) {
    return (
      <PrivateLayout title="User profile">
        <ProfileForm user={user} />
      </PrivateLayout>
    );
  }

  return (
    <PrivateLayout title="User profile">
      <ResourceNotFound name="User" />
    </PrivateLayout>
  );
};

export default ProfileDataLoader;
