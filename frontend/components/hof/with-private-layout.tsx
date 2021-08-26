import { FC, ReactElement } from 'react';

import PrivateLayout from '@components/layout/private/private-layout';

const withPrivateLayout = (Wrapped: FC<any>): (() => ReactElement) => {
  return () => {
    return (
      <PrivateLayout>
        <Wrapped />
      </PrivateLayout>
    );
  };
};

export { withPrivateLayout };
