import { ComponentType } from 'react';
import Head from 'next/head';

import PrivateLayout from '@components/layout/private/private-layout';

type WithPrivateLayoutProps = {
  title: string;
};

function withPrivateLayout<T>(WrappedComponent: ComponentType<T>, props: WithPrivateLayoutProps) {
  // eslint-disable-next-line react/display-name
  return (wrappedComponentProps: T) => {
    // eslint-disable-next-line react/prop-types
    const { title } = props;

    return (
      <PrivateLayout>
        <Head>
          <title>{title} | Prolang</title>
        </Head>
        <WrappedComponent {...wrappedComponentProps} />
      </PrivateLayout>
    );
  };
}

export { withPrivateLayout };
