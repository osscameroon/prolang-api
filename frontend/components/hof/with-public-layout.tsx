import { FC, ReactElement } from 'react';

import PublicLayout from '@components/layout/public/public-layout';

const withPublicLayout = (Wrapped: FC<any>): (() => ReactElement) => {
  return () => {
    return (
      <PublicLayout>
        <Wrapped />
      </PublicLayout>
    );
  };
};

export { withPublicLayout };
