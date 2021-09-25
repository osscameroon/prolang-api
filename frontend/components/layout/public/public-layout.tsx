import { PropsWithChildren } from 'react';
import PublicHeader from '@components/layout/public/header';
import PublicFooter from '@components/layout/public/footer';

const PublicLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div>
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;