import { PropsWithChildren } from 'react';

type PublicLayoutProps = {};

const PublicLayout = ({ children }: PropsWithChildren<PublicLayoutProps>) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default PublicLayout;