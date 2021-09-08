import { PropsWithChildren } from 'react';
import PublicHeader from '@components/layout/public/header';

type PublicLayoutProps = {};

const PublicLayout = ({ children }: PropsWithChildren<PublicLayoutProps>) => {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
};

export default PublicLayout;