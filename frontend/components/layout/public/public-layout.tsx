import { PropsWithChildren } from 'react';
import PublicHeader from '@components/layout/public/header';
import PublicFooter from '@components/layout/public/footer';
import { useAppStatus } from '@hooks/useAppStatus';
import Maintenance from '@components/common/maintenance';

const PublicLayout = ({ children }: PropsWithChildren<{}>) => {
  const appStatus = useAppStatus();

  if (!appStatus) {
    return <Maintenance />;
  }

  return (
    <div>
      <PublicHeader />
      <div className="relative top-[65px]">
        {children}
        <PublicFooter />
      </div>
    </div>
  );
};

export default PublicLayout;