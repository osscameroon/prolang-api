import { PropsWithChildren } from 'react';
import Head from 'next/head';
import { PublicHeader } from '@components/layout/public/header';
import { PublicFooter } from '@components/layout/public/footer';
import { useAppStatus } from '@hooks/useAppStatus';
import { Maintenance } from '@components/common/maintenance';
import { PageSeo } from '@components/common/seo';

type Props = {
  path?: string;
  title: string;
};

const PublicLayout = ({ children, path, title }: PropsWithChildren<Props>) => {
  const appStatus = useAppStatus();

  if (!appStatus) {
    return <Maintenance />;
  }

  return (
    <div>
      <Head>
        <title>{title} | Prolang</title>
      </Head>
      <PageSeo title={title} path={path}/>
      <PublicHeader />
      <div className="relative top-[65px]">
        {children}
        <PublicFooter />
      </div>
    </div>
  );
};

export { PublicLayout };