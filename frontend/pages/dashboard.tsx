import { BadgeCheckIcon, BanIcon, ClockIcon, FolderIcon } from '@heroicons/react/solid';

import { Loader } from '@components/common/loader';
import { DashboardCard } from '@components/dashboard/dashboard-card';
import { PageHeader } from '@components/common/page-header';
import { useDashboardSummary } from '@hooks/request/query/useDashboardSummary';
import { padZero } from '@utils/common';
import { PrivateLayout } from '@components/layout/private/private-layout';

const Dashboard = () => {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PrivateLayout title="Dashboard">
      <div className="md:container px-6 mx-auto grid">
        <PageHeader text="Dashboard" />

        <div className="bg- grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard color="blue" label="Year Groups" value={padZero(data?.yearGroup || 0)}>
            <FolderIcon className="w-5 h-5" />
          </DashboardCard>

          <DashboardCard color="green" label="Languages" value={padZero(data?.language || 0)}>
            <BadgeCheckIcon className="w-5 h-5" />
          </DashboardCard>

          <DashboardCard color="yellow" label="Authors" value={padZero(data?.author || 0)}>
            <ClockIcon className="w-5 h-5" />
          </DashboardCard>

          <DashboardCard color="pink" label="Users" value={padZero(data?.user || 0)}>
            <BanIcon className="w-5 h-5" />
          </DashboardCard>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default Dashboard;
