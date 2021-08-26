import { PropsWithChildren } from 'react';
import { useAuth } from '@hooks/useAuth';

import PrivateHeader from '@components/layout/private/header';
import PrivateSidebar from '@components/layout/private/sidebar';
import { Loader } from '@components/common/loader';
import { Redirect } from '@components/common/redirect';

type PrivateLayoutProps = {};

const PrivateLayout = ({ children }: PropsWithChildren<PrivateLayoutProps>) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader scope="page" />;
  }

  if (!loading && !user) {
    return <Redirect path="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <PrivateSidebar />
      <div className="flex flex-col flex-1">
        <PrivateHeader />
        <main className="h-full pb-16 overflow-y-auto relative">{children}</main>
      </div>
    </div>
  );
};

export default PrivateLayout;
