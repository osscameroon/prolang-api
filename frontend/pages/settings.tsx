import PrivateLayout from '@components/layout/private/private-layout';
import { PageHeader } from '@components/common/page-header';

const Settings = () => {
  return (
    <PrivateLayout>
      <div className="container px-6 mx-auto grid">
        <PageHeader text="Settings" />
      </div>
    </PrivateLayout>
  );
};

export default Settings;
