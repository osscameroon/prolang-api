import { FC, ReactElement } from 'react';

import PublicLayout from '@components/layout/public/public-layout';
import Head from 'next/head';

const withPublicLayout = (Wrapped: FC<any>, title: string): (() => ReactElement) => {
  return () => {
    return (
      <PublicLayout>
        <Head>
          <title>Prolang - {title}</title>
        </Head>
        <Wrapped />
      </PublicLayout>
    );
  };
};

export { withPublicLayout };
