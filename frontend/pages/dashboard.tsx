import { BadgeCheckIcon, BanIcon, ClockIcon, FolderIcon } from '@heroicons/react/solid';

import { Loader } from '@components/common/loader';
import { DashboardCard } from '@components/dashboard/dashboard-card';
import { PageHeader } from '@components/common/page-header';
import { withPrivateLayout } from '@components/hof/with-private-layout';
import { useDashboardSummary } from '@hooks/request/query/useDashboardSummary';
import { padZero } from '@utils/common';

const Dashboard = () => {
  const { data, isLoading } = useDashboardSummary();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="md:container px-6 mx-auto grid">
      <PageHeader text="Dashboard" />

      <div className="bg- grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <DashboardCard color="blue" label="Year Groups" value={padZero(data?.total || 0)}>
          <FolderIcon className="w-5 h-5" />
        </DashboardCard>

        <DashboardCard color="green" label="Languages" value={padZero(data?.confirmed || 0)}>
          <BadgeCheckIcon className="w-5 h-5" />
        </DashboardCard>

        <DashboardCard color="yellow" label="Authors" value={padZero(data?.pending || 0)}>
          <ClockIcon className="w-5 h-5" />
        </DashboardCard>

        <DashboardCard color="pink" label="Users" value={padZero(data?.cancelled || 0)}>
          <BanIcon className="w-5 h-5" />
        </DashboardCard>
      </div>
    </div>
  );
};

export default withPrivateLayout(Dashboard);
