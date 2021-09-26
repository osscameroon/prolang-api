import { FC, ReactElement } from 'react';
import Head from 'next/head';

import PublicLayout from '@components/layout/public/public-layout';
import { PageSeo } from '@components/common/seo';

type WithPublicLayoutProps = {
  title: string;
  path?: string;
};

const withPublicLayout = (Wrapped: FC<any>, props: WithPublicLayoutProps): (() => ReactElement) => {
  return () => {
    const { path, title } = props;

    return (
      <PublicLayout>
        <Head>
          <title>{title} | Prolang</title>
        </Head>
        <PageSeo title={title} path={path}/>
        <Wrapped/>
      </PublicLayout>
    );
  };
};

export { withPublicLayout };
