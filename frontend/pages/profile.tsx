import { withPrivateLayout } from '@components/hof/with-private-layout';
import { Loader } from '@components/common/loader';
import { ProfileForm } from '@components/profile/profile-form';
import { ResourceNotFound } from '@components/common/resource-not-found';
import { useAuth } from '@hooks/useAuth';

const ProfileDataLoader = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!loading && user) {
    return <ProfileForm user={user} />;
  }

  return <ResourceNotFound name="Planner" />;
};

export default withPrivateLayout(ProfileDataLoader, { title: 'User profile' });
