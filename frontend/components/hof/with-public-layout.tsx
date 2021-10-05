import { ComponentType } from 'react';
import Head from 'next/head';

import PublicLayout from '@components/layout/public/public-layout';
import { PageSeo } from '@components/common/seo';

type WithPublicLayoutProps = {
  title: string;
  path?: string;
};

function withPublicLayout<T>(WrappedComponent: ComponentType<T>, props: WithPublicLayoutProps) {
  return (wrappedComponentProps: T) => {
    const { path, title } = props;

    return (
      <PublicLayout>
        <Head>
          <title>{title} | Prolang</title>
        </Head>
        <PageSeo title={title} path={path}/>
        <WrappedComponent {...wrappedComponentProps} />
      </PublicLayout>
    );
  };
}

export { withPublicLayout };
