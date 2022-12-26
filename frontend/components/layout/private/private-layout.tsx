import { PropsWithChildren } from 'react';
import Head from 'next/head';

import { useAuth } from '@hooks/useAuth';
import { PrivateHeader } from '@components/layout/private/header';
import { PrivateSidebar } from '@components/layout/private/sidebar';
import { Loader } from '@components/common/loader';
import { Redirect } from '@components/common/redirect';

type Props = {
  title: string;
};

const PrivateLayout = ({ children, title }: PropsWithChildren<Props>) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader scope="page" />;
  }

  if (!loading && !user) {
    return <Redirect path="/" />;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{title} | Prolang</title>
      </Head>
      <PrivateSidebar />
      <div className="flex flex-col flex-1">
        <PrivateHeader />
        <main className="h-full pb-16 overflow-y-auto relative">{children}</main>
      </div>
    </div>
  );
};

export { PrivateLayout };
